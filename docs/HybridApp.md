在 Hybrid 架构（HarmonyOS + H5）下，H5 发起 SSE (Server-Sent Events) 请求时，App 切到后台导致连接断开是一个非常典型的**移动端系统资源调度与 Webview 生命周期管理**问题。

### 为什么会断开？

1. **HarmonyOS 进程冻结机制**：当 App 切到后台时，系统为了节省电量和内存，会挂起应用进程，限制网络请求。
2. **ArkWeb (Webview) JS 节流与挂起**：Webview 在后台时，内部的 JavaScript 执行会被严重降权或暂停（Timers 停止，网络回调不触发），导致 TCP 连接因为无响应超时或被系统主动回收。
3. **Nginx/网关 超时**：客户端被挂起后，无法继续接收 TCP 包或回复 ACK，Nginx 侧堆积后会主动断开连接。

要实现**“切后台出话不中断，切回后继续渲染”**，单纯依靠 H5 标准的 `EventSource` 是无法完美解决的。你需要结合**鸿蒙原生能力**、**前后端重连机制**以及**H5/Native 通信**来综合治理。

以下是推荐的解决方案（从轻量到深度）：

---

### 方案一：Native 短时任务保活（成本最低，解决短时间切后台）

如果用户切后台的时间通常不长（比如回个微信再切回来），可以利用 HarmonyOS 提供的**短时任务（Transient Task）**，为 App 在后台争取额外的执行时间（一般最高可达 3 分钟）。

**实现步骤：**

1. **监听切后台**：在鸿蒙原生的 `UIAbility` 的 `onBackground` 生命周期中，申请短时任务。
2. **申请延迟挂起**：调用 `@ohos.backgroundTaskManager` 的 `requestSuspendDelay` 方法。
3. **释放任务**：在 `onForeground` 时，调用 `cancelSuspendDelay` 取消短时任务。

**ArkTS 代码示例：**

```typescript
import backgroundTaskManager from '@ohos.backgroundTaskManager';

let delayId: number;

// 在 UIAbility 中
onBackground() {
  let delayInfo = backgroundTaskManager.requestSuspendDelay("SSE_KEEP_ALIVE", () => {
    // 任务超时后的回调
    console.info("Suspend delay task expired");
  });
  delayId = delayInfo.delayId;
}

onForeground() {
  if (delayId !== undefined) {
    backgroundTaskManager.cancelSuspendDelay(delayId);
  }
}
```

_注意：即使申请了短时任务，Webview 内部的 JS 依然可能被 ArkWeb 节流，导致渲染更新不及时。如果发现网络没断但是 H5 停止渲染了，需要参考方案二。_

---

### 方案二：Native 代理 SSE + 缓存分发（最完美，体验最平滑）

为了彻底摆脱 Webview 在后台 JS 停滞带来的影响，**将 SSE 网络请求交由鸿蒙 Native 层发起**。Native 拿到数据后通过 JSBridge 传给 H5。

**实现逻辑：**

1. **H5 发起请求**：H5 不再使用 `new EventSource()`，而是通过 JSBridge 通知 ArkTS 发起 SSE 请求。
2. **ArkTS 接管网络**：鸿蒙使用 `@ohos.net.http` 发起 HTTP 请求，并解析 SSE 数据流（Stream）。
3. **后台状态管理**：
   - 鸿蒙端维护一个状态：`isBackground`。
   - **App 在前台时**：ArkTS 收到一段数据（Chunk），立刻通过 JSBridge (如 `webController.runJavaScript` 或 `WebMessagePort`) 推给 H5 渲染。
   - **App 在后台时**：ArkTS 结合**方案一（短时任务）**保持网络不断，**将收到的 Chunk 暂存到 Native 的队列中**，不发给 H5（避免 H5 被挂起导致消息丢失）。
4. **切回前台恢复**：App 触发 `onForeground` 时，ArkTS 将暂存的队列数据一次性通过 JSBridge 冲刷（Flush）给 H5，H5 瞬间完成缺失部分的渲染，后续数据继续流式直传。

---

### 方案三：前端 + 后端配合的“断点续传”（必须有的兜底策略）

无论客户端怎么保活，系统在极端情况下（或者超过短时任务的 3 分钟限制）依然会杀掉网络连接。因此，**SSE 重连与状态恢复（断点续传）是必不可少的**。

**后端改造：**

1. 每一条流式消息（Message）必须带上唯一的 ID（如 SSE 规范中的 `id: xxx`）或者序号（Index/Offset）。
2. 后端提供一个参数（如 `Last-Event-ID` Header 或 URL Params `?resume_from=xxx`），允许客户端指定从哪一个字符或哪一个批次继续生成，而不是从头开始大模型推理。

**H5 前端改造：**

1. **状态记录**：H5 在出话过程中，实时记录最后一次收到的 `Message ID` 或已渲染的文本长度。
2. **断线检测**：监听 H5 的 `visibilitychange` 事件或 `EventSource` 的 `onerror`/`onclose` 事件。
3. **切回重连**：当监听到页面重新可见（`document.visibilityState === 'visible'`），检查 SSE 是否已断开且出话未完成。
4. **携带标识恢复**：如果是，携带刚才记录的 `Last-Event-ID` 重新向后端发起 SSE 请求，后端仅将**未下发的部分**继续流式返回给前端。

```javascript
// 前端重连逻辑简易示例
let lastEventId = ""
let isGenerating = true

document.addEventListener("visibilitychange", () => {
  if (
    document.visibilityState === "visible" &&
    isGenerating &&
    sseDisconnected
  ) {
    // 重新发起带有最后消息位置的 SSE 请求
    connectSSE({ "Last-Event-ID": lastEventId })
  }
})
```

---

### 方案四：Nginx 层代理优化（基础设施保障）

确保 Nginx 的配置不会因为客户端后台挂起（TCP 零窗口期）过早主动掐断连接。在你的 Nginx 代理配置中，增加/检查以下关于 SSE 的配置项：

```nginx
location /sse-endpoint {
    # 关键：关闭代理缓冲，使得数据立刻发给客户端
    proxy_buffering off;
    # 保持长连接
    proxy_http_version 1.1;
    proxy_set_header Connection "";

    # 延长读写超时时间（视你的大模型生成最大时间而定）
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;

    # 防止 Nginx 等待客户端 ACK 超时过短
    send_timeout 300s;
}
```

### 总结与落地建议

最成熟的生产级做法是 **方案一 + 方案三**的组合，或者 **方案二 + 方案三**的组合：

- **敏捷开发路线**：H5 实现断点续传（方案三） + 鸿蒙端添加短时任务保活（方案一）。这可以在较小改动下，保证短时间切后台不断开，长时间切后台断开后能无缝恢复。
- **极致体验路线（推荐大型商业项目）**：采用**Native 接管请求与缓存分发（方案二）** + 后端断点续传兜底（方案三）。这样彻底解耦了 UI 渲染和网络请求，不会出现因 Webview 休眠导致的丢包或错乱问题。

这份技术文档将基于**“Native 接管网络与分发 + 后端断点续传兜底”**的最佳实践，为你提供从架构设计、任务拆解到核心代码的保姆级重构指南。

你可以直接将这份文档作为敏捷开发中的 Epic/Feature，分配给鸿蒙和前端开发人员。

---

# 🚀 Hybrid 架构下 SSE 后台保活与重连重构方案

## 一、 背景与目标

**问题**：当前使用 H5 原生 `EventSource`，在 App 切后台时 Webview JS 线程被挂起，导致 TCP 窗口阻塞，触发 Nginx 超时断开。切回前台后无法恢复丢失的数据，出话截断。
**目标**：

1. **可靠传输**：将 SSE 请求下沉至鸿蒙 Native 层发起，摆脱 Webview 生命周期限制。
2. **状态补偿**：App 在后台时，Native 自动将收到的数据流加入内存队列；切回前台时瞬间清空队列推给 H5。
3. **断点续传**：极端情况下（如系统杀掉底层网络），前端依赖最后一次 `MessageID` 重新请求，后端从断点处继续下发。

---

## 二、 任务拆解 (WBS)

| 阶段        | 任务名称                  | 负责人      | 核心工作内容                                                                         |
| :---------- | :------------------------ | :---------- | :----------------------------------------------------------------------------------- |
| **Phase 1** | **Native SSE 客户端封装** | 鸿蒙端      | 使用 `@ohos.net.http` 封装 `SSEClient`，处理 HTTP Chunk、半包/粘包、UTF-8 流式解码。 |
| **Phase 2** | **前后台状态与队列调度**  | 鸿蒙端      | 实现 `SSEManager` 单例，根据前后台状态切换“直接下发”或“队列暂存”策略。               |
| **Phase 3** | **JSBridge 通信搭建**     | 鸿蒙端/前端 | 鸿蒙通过 `javaScriptProxy` 暴露请求接口，通过 `runJavaScript` 推送数据给 H5。        |
| **Phase 4** | **H5 状态管理与断点续传** | 前端 (H5)   | 废弃 `new EventSource()`，改为调用 Bridge；记录 `last_id`；监听错误并重试。          |

---

## 三、 详细代码实现（可直接使用）

### 👨‍💻 [鸿蒙端] 核心逻辑重构

#### 1. 新建 `SSEClient.ets`（底层网络收发器）

负责真正的 HTTP 流式请求，解决**粘包、半包、中文乱码**问题。

```typescript
import http from "@ohos.net.http"
import util from "@ohos.util"

export class SSEClient {
  private httpRequest: http.HttpRequest | null = null
  private textDecoder = util.TextDecoder.create("utf-8")
  private streamBuffer: string = ""

  /**
   * 发起 SSE 请求
   * @param url 请求地址
   * @param lastId 断点续传 ID
   * @param onMessage 收到一条完整数据块的回调
   * @param onComplete 结束或异常的回调
   */
  public connect(
    url: string,
    lastId: string,
    onMessage: (data: string, id: string) => void,
    onComplete: (isError: boolean) => void,
  ) {
    this.httpRequest = http.createHttp()
    this.streamBuffer = ""

    let headers: Record<string, string> = {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    }
    if (lastId) {
      headers["Last-Event-ID"] = lastId // 用于后端断点续传
    }

    this.httpRequest.on("dataReceive", (data: ArrayBuffer) => {
      // 1. 流式解码：防止中文字符被截断产生乱码
      let chunk = this.textDecoder.decodeWithStream(new Uint8Array(data))
      this.streamBuffer += chunk

      // 2. 按照 SSE 规范，两个换行符代表一个事件的结束
      let parts = this.streamBuffer.split("\n\n")

      // 3. 最后一个如果不是完整的包，留到下一个 TCP 包拼接
      this.streamBuffer = parts.pop() || ""

      for (let part of parts) {
        let lines = part.split("\n")
        let payload = ""
        let msgId = ""

        for (let line of lines) {
          if (line.startsWith("id: ")) msgId = line.substring(4).trim()
          if (line.startsWith("data: ")) payload = line.substring(6).trim()
        }

        if (payload) {
          if (payload === "[DONE]") {
            onComplete(false)
            this.disconnect()
          } else {
            onMessage(payload, msgId)
          }
        }
      }
    })

    this.httpRequest
      .request(url, {
        method: http.RequestMethod.GET,
        header: headers,
        expectDataType: http.HttpDataType.ARRAY_BUFFER, // 必须使用 ARRAY_BUFFER 才能流式接收
        readTimeout: 120000, // 根据你的最长出话时间设置
        connectTimeout: 10000,
      })
      .then(() => {
        onComplete(false)
      })
      .catch((err: Error) => {
        console.error("SSE Error:", JSON.stringify(err))
        onComplete(true) // 发生异常，通知 H5 可能需要重连
      })
  }

  public disconnect() {
    if (this.httpRequest) {
      this.httpRequest.destroy()
      this.httpRequest = null
    }
  }
}
```

#### 2. 新建 `SSEManager.ets`（后台缓存调度器）

负责判断当前是否在后台。在后台时将消息存入 `messageQueue`，切前台时清空下发。

```typescript
import web_webview from "@ohos.web.webview"
import { SSEClient } from "./SSEClient"

export class SSEManager {
  private static instance: SSEManager
  private sseClient: SSEClient | null = null
  private webController: web_webview.WebviewController | null = null

  private isBackground: boolean = false
  private messageQueue: Array<{ payload: string; id: string }> = []

  private constructor() {}

  public static getInstance(): SSEManager {
    if (!SSEManager.instance) {
      SSEManager.instance = new SSEManager()
    }
    return SSEManager.instance
  }

  /**
   * 设置 Web 控制器（用于下发 JS）
   */
  public setWebController(controller: web_webview.WebviewController) {
    this.webController = controller
  }

  /**
   * 生命周期：页面切后台
   */
  public onBackground() {
    this.isBackground = true
    console.info("SSEManager: App in Background, start queuing...")
  }

  /**
   * 生命周期：页面切前台
   */
  public onForeground() {
    this.isBackground = false
    console.info(
      `SSEManager: App in Foreground, flushing ${this.messageQueue.length} messages`,
    )
    // 一次性把暂存的消息推给 H5
    if (this.messageQueue.length > 0) {
      let batchData = JSON.stringify(this.messageQueue)
      this.sendToH5(`window.onSSEBatchMessage(${batchData})`)
      this.messageQueue = [] // 清空队列
    }
  }

  /**
   * H5 触发开始 SSE
   */
  public startSSE(url: string, lastId: string) {
    if (this.sseClient) {
      this.sseClient.disconnect()
    }
    this.sseClient = new SSEClient()
    this.messageQueue = []

    this.sseClient.connect(
      url,
      lastId,
      (payload: string, msgId: string) => {
        if (this.isBackground) {
          // 在后台，塞入队列
          this.messageQueue.push({ payload, id: msgId })
        } else {
          // 在前台，直接单条发送
          // 注意：使用 Base64 或安全的 JSON 序列化防止转义字符导致 JS 语法错误
          let safeStr = JSON.stringify({ payload, id: msgId })
          this.sendToH5(`window.onSSESingleMessage(${safeStr})`)
        }
      },
      (isError: boolean) => {
        this.sendToH5(`window.onSSEComplete(${isError})`)
      },
    )
  }

  public stopSSE() {
    if (this.sseClient) {
      this.sseClient.disconnect()
      this.sseClient = null
    }
  }

  private sendToH5(script: string) {
    if (this.webController) {
      this.webController.runJavaScript(script).catch((err) => {
        console.error("Run JS Error", err)
      })
    }
  }
}
```

#### 3. 页面组件 `Index.ets` (注入 JSBridge 与绑定生命周期)

```typescript
import web_webview from '@ohos.web.webview';
import { SSEManager } from './SSEManager';

@Entry
@Component
struct WebPage {
  controller: web_webview.WebviewController = new web_webview.WebviewController();

  // WebBridge 对象，暴露给 H5 调用
  nativeBridge = {
    startSSE: (url: string, lastId: string) => {
      SSEManager.getInstance().startSSE(url, lastId);
    },
    stopSSE: () => {
      SSEManager.getInstance().stopSSE();
    }
  };

  // 绑定生命周期
  onPageShow() {
    SSEManager.getInstance().onForeground();
  }

  onPageHide() {
    SSEManager.getInstance().onBackground();
  }

  aboutToAppear() {
    SSEManager.getInstance().setWebController(this.controller);
  }

  build() {
    Column() {
      Web({ src: 'https://你的H5地址.com', controller: this.controller })
        // 注册 JSBridge
        .javaScriptProxy({
          object: this.nativeBridge,
          name: "NativeBridge", // H5 通过 window.NativeBridge 访问
          methodList:["startSSE", "stopSSE"],
          controller: this.controller
        })
        .width('100%')
        .height('100%')
    }
  }
}
```

---

### 🌐 [前端 H5 端] 状态接管与断点重试

H5 端需要废弃原生的 `new EventSource()`，改为实现**全局回调函数**接收鸿蒙的数据，并自己维护最后一条 ID 用于错误重连。

#### H5 JS 核心代码实现

```javascript
class HybridSSEClient {
  constructor() {
    this.currentUrl = ""
    this.lastEventId = ""
    this.isGenerating = false

    // 1. 注册全局方法供鸿蒙 Native 调用
    window.onSSESingleMessage = this.handleSingleMessage.bind(this)
    window.onSSEBatchMessage = this.handleBatchMessage.bind(this)
    window.onSSEComplete = this.handleComplete.bind(this)
  }

  /**
   * 发起请求
   * @param {string} url - 包含完整参数的 URL
   */
  start(url) {
    this.currentUrl = url
    this.lastEventId = "" // 重新提问时清空
    this.isGenerating = true

    // 真正发起网络请求交由 Native
    if (window.NativeBridge) {
      window.NativeBridge.startSSE(this.currentUrl, this.lastEventId)
    } else {
      console.warn("未处于鸿蒙环境，请实现本地 EventSource fallback")
    }
  }

  /**
   * 处理单条消息（前台状态时触发）
   */
  handleSingleMessage(dataObj) {
    if (!this.isGenerating) return

    // 记录断点续传的 ID
    if (dataObj.id) {
      this.lastEventId = dataObj.id
    }

    // 将 dataObj.payload 渲染到屏幕上的业务逻辑
    this.renderTextToScreen(dataObj.payload)
  }

  /**
   * 处理批量消息（从后台切回前台时触发）
   */
  handleBatchMessage(dataArray) {
    if (!this.isGenerating) return

    let combinedText = ""
    for (let item of dataArray) {
      if (item.id) this.lastEventId = item.id
      combinedText += item.payload // 如果是 Markdown 打字机，直接拼接 payload
    }

    // 瞬间渲染补偿的内容
    this.renderTextToScreen(combinedText)
  }

  /**
   * SSE 结束或异常断开
   */
  handleComplete(isError) {
    if (isError && this.isGenerating) {
      console.warn(`网络异常断开，尝试从断点 ${this.lastEventId} 处恢复`)
      // 触发重连，带着记录的 lastEventId
      setTimeout(() => {
        if (window.NativeBridge) {
          window.NativeBridge.startSSE(this.currentUrl, this.lastEventId)
        }
      }, 1000)
    } else {
      // 正常结束
      this.isGenerating = false
      console.log("出话完成")
    }
  }

  stop() {
    this.isGenerating = false
    if (window.NativeBridge) {
      window.NativeBridge.stopSSE()
    }
  }

  // 模拟业务侧的打字机渲染函数
  renderTextToScreen(text) {
    // TODO: 实现你的 DOM 拼接/Vue/React 状态更新逻辑
    // document.getElementById('chat-box').innerText += text;
  }
}

// 实例化并暴露给业务使用
const sseClient = new HybridSSEClient()
export default sseClient
```

---

## 四、 后端改造契约说明 (Backend API Contract)

为了让“断点续传”生效，后端接口必须支持接收 `Last-Event-ID`。

1. **请求头识别**：后端需检查 HTTP Request Header 中的 `Last-Event-ID`（或者 H5 自行拼在 URL 的 `?last_id=xxx` 参数里）。
2. **状态还原**：如果发现请求带有 `last_id`，**不要进行新的大模型推理**，而是直接从缓存中或大模型生成的历史流中，定位到 `last_id` 之后的内容。
3. **继续下发**：仅将 `last_id` 之后缺失的 `chunk` 下发给客户端即可。

---

## 五、 测试验收 Case 建议

开发完成后，按照以下步骤严格验收：

1. **常规出话测试**：发问，保持前台，检查出话是否平滑，字是否有乱码（尤其是生僻中文字符）。
2. **短时后台测试（验证队列机制）**：点击发问 -> 立即切后台 -> 等待 5 秒钟 -> 切回前台。
   - _预期结果_：切回瞬间，过去 5 秒错过的文字**瞬间大段补齐**，并且继续顺滑出话。
3. **断网重连测试（验证断点续传机制）**：点击发问 -> 关闭手机 WiFi/流量模拟断网 -> 等待 3 秒 -> 打开 WiFi。
   - _预期结果_：短暂卡顿后，H5 自动发起重连，内容**不重头开始，不错乱，顺接上文**继续打出。
