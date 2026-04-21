


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

| 阶段 | 任务名称 | 负责人 | 核心工作内容 |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Native SSE 客户端封装** | 鸿蒙端 | 使用 `@ohos.net.http` 封装 `SSEClient`，处理 HTTP Chunk、半包/粘包、UTF-8 流式解码。 |
| **Phase 2** | **前后台状态与队列调度** | 鸿蒙端 | 实现 `SSEManager` 单例，根据前后台状态切换“直接下发”或“队列暂存”策略。 |
| **Phase 3** | **JSBridge 通信搭建** | 鸿蒙端/前端 | 鸿蒙通过 `javaScriptProxy` 暴露请求接口，通过 `runJavaScript` 推送数据给 H5。 |
| **Phase 4** | **H5 状态管理与断点续传** | 前端 (H5) | 废弃 `new EventSource()`，改为调用 Bridge；记录 `last_id`；监听错误并重试。 |

---

## 三、 详细代码实现（可直接使用）

### 👨‍💻 [鸿蒙端] 核心逻辑重构

#### 1. 新建 `SSEClient.ets`（底层网络收发器）
负责真正的 HTTP 流式请求，解决**粘包、半包、中文乱码**问题。

```typescript
import http from '@ohos.net.http';
import util from '@ohos.util';

export class SSEClient {
  private httpRequest: http.HttpRequest | null = null;
  private textDecoder = util.TextDecoder.create('utf-8');
  private streamBuffer: string = ''; 

  /**
   * 发起 SSE 请求
   * @param url 请求地址
   * @param lastId 断点续传 ID
   * @param onMessage 收到一条完整数据块的回调
   * @param onComplete 结束或异常的回调
   */
  public connect(url: string, lastId: string, onMessage: (data: string, id: string) => void, onComplete: (isError: boolean) => void) {
    this.httpRequest = http.createHttp();
    this.streamBuffer = '';

    let headers: Record<string, string> = {
      'Accept': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    };
    if (lastId) {
      headers['Last-Event-ID'] = lastId; // 用于后端断点续传
    }

    this.httpRequest.on('dataReceive', (data: ArrayBuffer) => {
      // 1. 流式解码：防止中文字符被截断产生乱码
      let chunk = this.textDecoder.decodeWithStream(new Uint8Array(data));
      this.streamBuffer += chunk;

      // 2. 按照 SSE 规范，两个换行符代表一个事件的结束
      let parts = this.streamBuffer.split('\n\n');
      
      // 3. 最后一个如果不是完整的包，留到下一个 TCP 包拼接
      this.streamBuffer = parts.pop() || '';

      for (let part of parts) {
        let lines = part.split('\n');
        let payload = '';
        let msgId = '';

        for (let line of lines) {
          if (line.startsWith('id: ')) msgId = line.substring(4).trim();
          if (line.startsWith('data: ')) payload = line.substring(6).trim();
        }

        if (payload) {
          if (payload === '[DONE]') {
            onComplete(false);
            this.disconnect();
          } else {
            onMessage(payload, msgId);
          }
        }
      }
    });

    this.httpRequest.request(url, {
      method: http.RequestMethod.GET,
      header: headers,
      expectDataType: http.HttpDataType.ARRAY_BUFFER, // 必须使用 ARRAY_BUFFER 才能流式接收
      readTimeout: 120000, // 根据你的最长出话时间设置
      connectTimeout: 10000
    }).then(() => {
      onComplete(false);
    }).catch((err: Error) => {
      console.error('SSE Error:', JSON.stringify(err));
      onComplete(true); // 发生异常，通知 H5 可能需要重连
    });
  }

  public disconnect() {
    if (this.httpRequest) {
      this.httpRequest.destroy();
      this.httpRequest = null;
    }
  }
}
```

#### 2. 新建 `SSEManager.ets`（后台缓存调度器）
负责判断当前是否在后台。在后台时将消息存入 `messageQueue`，切前台时清空下发。

```typescript
import web_webview from '@ohos.web.webview';
import { SSEClient } from './SSEClient';

export class SSEManager {
  private static instance: SSEManager;
  private sseClient: SSEClient | null = null;
  private webController: web_webview.WebviewController | null = null;
  
  private isBackground: boolean = false;
  private messageQueue: Array<{ payload: string, id: string }> =[];

  private constructor() {}

  public static getInstance(): SSEManager {
    if (!SSEManager.instance) {
      SSEManager.instance = new SSEManager();
    }
    return SSEManager.instance;
  }

  /**
   * 设置 Web 控制器（用于下发 JS）
   */
  public setWebController(controller: web_webview.WebviewController) {
    this.webController = controller;
  }

  /**
   * 生命周期：页面切后台
   */
  public onBackground() {
    this.isBackground = true;
    console.info("SSEManager: App in Background, start queuing...");
  }

  /**
   * 生命周期：页面切前台
   */
  public onForeground() {
    this.isBackground = false;
    console.info(`SSEManager: App in Foreground, flushing ${this.messageQueue.length} messages`);
    // 一次性把暂存的消息推给 H5
    if (this.messageQueue.length > 0) {
      let batchData = JSON.stringify(this.messageQueue);
      this.sendToH5(`window.onSSEBatchMessage(${batchData})`);
      this.messageQueue =[]; // 清空队列
    }
  }

  /**
   * H5 触发开始 SSE
   */
  public startSSE(url: string, lastId: string) {
    if (this.sseClient) {
      this.sseClient.disconnect();
    }
    this.sseClient = new SSEClient();
    this.messageQueue =[];

    this.sseClient.connect(url, lastId, 
      (payload: string, msgId: string) => {
        if (this.isBackground) {
          // 在后台，塞入队列
          this.messageQueue.push({ payload, id: msgId });
        } else {
          // 在前台，直接单条发送
          // 注意：使用 Base64 或安全的 JSON 序列化防止转义字符导致 JS 语法错误
          let safeStr = JSON.stringify({payload, id: msgId});
          this.sendToH5(`window.onSSESingleMessage(${safeStr})`);
        }
      }, 
      (isError: boolean) => {
        this.sendToH5(`window.onSSEComplete(${isError})`);
      }
    );
  }

  public stopSSE() {
    if (this.sseClient) {
      this.sseClient.disconnect();
      this.sseClient = null;
    }
  }

  private sendToH5(script: string) {
    if (this.webController) {
      this.webController.runJavaScript(script).catch(err => {
        console.error("Run JS Error", err);
      });
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

### 🌐 [前端 H5端] 状态接管与断点重试

H5 端需要废弃原生的 `new EventSource()`，改为实现**全局回调函数**接收鸿蒙的数据，并自己维护最后一条 ID 用于错误重连。

#### H5 JS 核心代码实现

```javascript
class HybridSSEClient {
  constructor() {
    this.currentUrl = '';
    this.lastEventId = '';
    this.isGenerating = false;
    
    // 1. 注册全局方法供鸿蒙 Native 调用
    window.onSSESingleMessage = this.handleSingleMessage.bind(this);
    window.onSSEBatchMessage = this.handleBatchMessage.bind(this);
    window.onSSEComplete = this.handleComplete.bind(this);
  }

  /**
   * 发起请求
   * @param {string} url - 包含完整参数的 URL
   */
  start(url) {
    this.currentUrl = url;
    this.lastEventId = ''; // 重新提问时清空
    this.isGenerating = true;
    
    // 真正发起网络请求交由 Native
    if (window.NativeBridge) {
      window.NativeBridge.startSSE(this.currentUrl, this.lastEventId);
    } else {
      console.warn("未处于鸿蒙环境，请实现本地 EventSource fallback");
    }
  }

  /**
   * 处理单条消息（前台状态时触发）
   */
  handleSingleMessage(dataObj) {
    if (!this.isGenerating) return;
    
    // 记录断点续传的 ID
    if (dataObj.id) {
      this.lastEventId = dataObj.id;
    }
    
    // 将 dataObj.payload 渲染到屏幕上的业务逻辑
    this.renderTextToScreen(dataObj.payload);
  }

  /**
   * 处理批量消息（从后台切回前台时触发）
   */
  handleBatchMessage(dataArray) {
    if (!this.isGenerating) return;
    
    let combinedText = '';
    for (let item of dataArray) {
      if (item.id) this.lastEventId = item.id;
      combinedText += item.payload; // 如果是 Markdown 打字机，直接拼接 payload
    }
    
    // 瞬间渲染补偿的内容
    this.renderTextToScreen(combinedText);
  }

  /**
   * SSE 结束或异常断开
   */
  handleComplete(isError) {
    if (isError && this.isGenerating) {
      console.warn(`网络异常断开，尝试从断点 ${this.lastEventId} 处恢复`);
      // 触发重连，带着记录的 lastEventId
      setTimeout(() => {
        if (window.NativeBridge) {
          window.NativeBridge.startSSE(this.currentUrl, this.lastEventId);
        }
      }, 1000);
    } else {
      // 正常结束
      this.isGenerating = false;
      console.log("出话完成");
    }
  }

  stop() {
    this.isGenerating = false;
    if (window.NativeBridge) {
      window.NativeBridge.stopSSE();
    }
  }

  // 模拟业务侧的打字机渲染函数
  renderTextToScreen(text) {
    // TODO: 实现你的 DOM 拼接/Vue/React 状态更新逻辑
    // document.getElementById('chat-box').innerText += text;
  }
}

// 实例化并暴露给业务使用
const sseClient = new HybridSSEClient();
export default sseClient;
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
   * *预期结果*：切回瞬间，过去 5 秒错过的文字**瞬间大段补齐**，并且继续顺滑出话。
3. **断网重连测试（验证断点续传机制）**：点击发问 -> 关闭手机 WiFi/流量模拟断网 -> 等待 3 秒 -> 打开 WiFi。
   * *预期结果*：短暂卡顿后，H5 自动发起重连，内容**不重头开始，不错乱，顺接上文**继续打出。