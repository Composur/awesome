---
sidebar: auto
---

## HTTP 、HTTPS

### HTTP 协议是什么？有哪些特点？

+ header + body 结。 **起始行 + 头部 + 空行 + 实体**

```http
# 起始行 方法 + 路径 + 版本号
GET /home HTTP/1.1
```

### HTTPS

> 出现是为了解决 HTTP 明文传输带来的安全性问题，因在 HTTP 传输的过程中任何人都可以截获，修改等。HTTPS 提供了三个保障：加密（客户端和服务端交互），数据一致性（传输的数据一致），身份认证（防止中间人攻击）。

**HTTP 请求数据传输存在的问题：**

+ 明文传输等于裸奔  
+ 对称加密：加解密是一套 `key` 也等于裸奔
+ 非对称加密：客户端可以拿公钥对数据加密传输到服务端，但是反过来不行，服务端到客户端数据不安全。

**解决办法：HTTPS**

**HTTP + TSL(SSL) = HTTPS** 相当于在 `HTTP` 外面套了一层 `SSL` ，`HTTP` 先和 `TSL` 通信，`TLS` 在根本上使用`对称加密`和 `非对称加密` 两种形式。`TLS` 是一个双向验证的过程，握手正式结束后，`HTTP` 才开始正式的加密报文传输。

传输层安全性(`TLS`)，安全套接字层(`SSL`)。`TLS` 是 `SSL` 的后续版本。它们是用于计算机之间的身份验证和传输加密数据的一种协议。

**非对称加密的特点：**

+ 公钥加密私钥解密，例如：任何经过 A 服务公钥加密的信息，只有 A 服务的私钥才能解密。

服务端拿到客户端的随机字符串后生成对层加密的 `key`

+ 任何有公钥的人可以确认对方发送的信息是否被加密过的。
  + 一般访问 `https` 网站，服务器会向客户端发送由 `CA` 签名认证的公钥信息。
  + 客户端拿到公钥对请求到服务端的字段（随机字符）进行公钥加密
  + 服务端用私钥解密客户端发来的随机字符，作为对称加密的 `key` 

`HTTPS` 存在的问题：中间人劫持，它代理了服务端。

+ 在客户端和服务端中间用自己的公钥私钥进行劫持数据，转发客户端和服务端请求
+ 记录客户端和服务端的通信数据，进行篡改。

**解决方案：CA**

因为客户端不知道拿到的公钥到底是服务端的还是中间人的。服务端用 `CA` 认证生成 `license` ,发给客户端，浏览器存了在大量的 `CA` 机构的公钥，对拿到的公钥进行验证。

**细节：客户端服务端协商的过程是怎么样的？**

+ 客户端请求服务端会携带 `SSL` 版本、非对称加密算法、随机数1
+ 服务端采用客户端的 `SSL` 版本、发送对称算法、随机数2、证书
+ 客户端认证证书
+ 客户端发送随机数3、hash(含第一步、第二步的数据)，上传到服务端。
+ 服务端检查客户端发来的 hash 是否和前两步发来的 hash 一致 ，根据协商一致的算法三个随机数生成 key 
+ 服务端采用散列算法生成 hash(随机数1，随机数2，随机数3)
+ 客户端也生成  hash(随机数1，随机数2，随机数3) 生成一个 key 服务端的 key 和 客户端的 key 均不在网络上传输，做本地校验使用。

**总结：**

`HTTPS` 采用了非对称加密 + 对称加密 + `CA` + `hash` 算法 

### HTTP 各个版本的区别是什么

*解决了哪些问题？比如头部缩减的优化，那你了解这个优化的具体策略吗？缩减了什么？又增加了什么？要深挖细节。多路复用，是怎么多路复用的？*

![http3](./img/http3.jpg)

** HTTP 1.0 短连接 **，带来的问题。

如果有 100 张图片，要发送 100 次请求，需要 100 次的 TCP 握手和挥手，消耗性能。



**http 1.1 长连接**，只需要一次 TCP 握手和挥手。

HTTP/1.1 有两个主要的缺点：**安全不足和性能不高**。

```http
connection:keep-alive;
```

请求一个数据后不关闭连接继续请求其它数据。在同一个连接中完成多个请求。

也可以同时向服务器建立多个连接，不过是有限制的 Chrome 对同一域名的请求一般是 6 个。如果有 12 个请求是需要等前 6 个完成后后面 6 个才可以建立连接请求。



**http 2.0 长连接 + io 多路复用模型**

**HTTP/2是基于二进制“帧”的协议，HTTP/1.1是基于“文本分割” （key:value）解析的协议。** 

> HTTP/2基于SPDY，专注于性能，最大的一个目标是在用户和网站间只用一个连接（connection），使用HTTP/2能带来20%~60%的效率提升。

解决的问题：

1. 明文，改成二进制传输。

2. 传输，改成单连接 + 帧

3. header 太长 ，HTTP 2.0 以二进制方式传输和 Header 压缩。

   建立索引表让请求头字段得到极大程度的精简和复用。

   我们用 `BT`下载，下载电视剧合集的时候不是一集一集的下载而是把资源打散成一个个块，每个块在客户端和服务端之间都是平等的，大家交错传输，传输完后客户端再进行重组。

   在 `HTTP2.0` 中原来的`Header+Body`的消息**打散**为数个小片的二进制"帧，用**Headers帧**存放头部字段，**Data帧**存放请求体数据，请求和响应多路复用，交错传输，请求完成后在另一端组装。

   所以 `HTTP2.0` 很好的解决了浏览器限制同一个域名下的请求数量的问题，同时也接更容易实现全速传输，一次请求完成（html css js 下载到浏览器）。

4. server 主动 push ，服务器推送

**HTTP 3.0**

http3 基于 UDP 的 Quic  

QUIC 基于 UDP 实现，是 HTTP/3 中的底层支撑协议，该协议基于 UDP，又取了 TCP 中的精华，实现了既快又可靠的协议

+ HTTP 2 新特性

  + 流量控制
  + 重置消息
  + 多路复用
  + HTTP/2 使用 TCP 协议来传输的，而如果使用 HTTPS 的话，还需要使用 TLS 协议进行安全传输，而使用TLS也需要一个握手过程，**这样就需要有两个握手延迟过程**：

  

7. URI和URL的区别？
    + URI是`Uniform Resource Identifier`的缩写,统一资源标识符,即由某个协议方案表示的资源的定位标识符
    + URI 用字符串标识某一互联网资源，而 URL表示资源的地点（互联网上所处的位置）。可见 URL是 URI 的子集<br>
    + URI的例子
    ![uri](http://cdn.xutong.top/uri.jpg)
    + 绝对URI的格式,遵循以下规则。
    ![uri](./img/uri02.jpg)
## HTTP 进阶

+ 说说Http协议的工作流程
+ Http请求报文与响应报文的格式？
+ Http首部包含哪些字段？举例说明
+ Https的原理是什么？
+ 浅析Http和Https的三次握手有什么区别。
+ 谈谈Session/cookie机制，如何实现会话跟踪？
+ 什么是Web缓存？原理如何？
+ OSI有哪七层模型？TCP/IP是哪四层模型。
+ 讲一讲TCP协议的三次握手和四次挥手流程。
+ 为什么TCP建立连接协议是三次握手，而关闭连接却是四次握手呢？为什么不能用两次握手进行连接？
+ websockt是什么？和Http有什么区别？
+ 什么是非持久连接，什么是持久连接？
+ Keep-Alive: timeout=5, max=100是什么意思？
+ http1.0，http1.1，http2.0区别（HTTP1.1版本新特性？HTTP2版本新特性？）
+ 对Http代理做个介绍？
+ 常见的鉴权方式有哪些？
+ http 2 http3
  + 以富媒体（如图片、声音、视频）

## HTTP Auth 验证

Authorization  401 ，没有带认证或认证信息错误

Forbidden 403，带有认证信息但是服务端认为认证信息对应的用户没有对应资源的访问权限

二者都可以理解为权限不足

**Authorization：**

作为 HTTP 的 Header 每次携带用户信息去请求资源。

+ Basic 方法 Base64 编码用户信息发送到服务端 

  

+ Bearer 方式 token 的模式

  ```http
  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9; base64 解码 {"alg":"RS256","typ":"JWT"}
  ```

  

## HTTP 缓存

客户端向服务器请求资源，服务器返回响应的时候，会返回一组描述响应的内容类型、长度、缓存指令、验证令牌的 HTTP 标头。

![http_res](./img/http_res.tiff)

上图表示：

+ 返回一个 `1024` 字节的响应
+ 客户端最多缓存 `120s`
+ 提供一个验证令牌 `x234dff` 用于在响应过期后检查资源是否被修改
  + 这个令牌一般是文件内容的 `hash` 或其它指纹

### 通过 Etag 验证缓存的响应

以上图为例：客户端在 120s 对同一资源又发起了请求，会带上这个 `Etag` 发送到服务器，如果指纹未发送改变，服务器会返回 `304 Not Modified` 响应，告知浏览器缓存中的响应未发生改变，可以继续延用 120s 。这样就不用再次下载数据，直接用浏览器自身的缓存就可以。

### Cache-Control

> Cache-Control 指令控制谁在什么条件下可以缓存响应以及可以缓存多久

```js
// express 设置响应的缓存
res.setHeader('Cache-Control', 'no-cache')
res.setHeader('Cache-Control', 'no-store')
next()
```

#### no-cache

表示客户端必须先于服务器确定返回的响应是否发生了变化，通过 etag 验证资源是否发生了改变，然后才能使用该响应。如果为发生改变则不用下载直接使用浏览器的缓存。

#### no-store

禁止浏览器缓存服务器的响应。

#### public

`public` 不是必需的，因为明确的缓存信息（例如 `max-age`）已表示响应是可以缓存的。

#### private

浏览器可以缓存 `private` 响应，但是这是只为单个用户的缓存，不允许中间缓存对其缓存，例如 `CDN` 不能缓存。

#### max-age

从请求时间开始，允许响应缓存的最长时间（秒）。

```js
res.setHeader('Cache-Control', 'public, max-age=86400'); // 一天
```

#### 最佳缓存策略

理想情况下客户端应该尽可能多的缓存响应，缓存尽可能长的时间。并未每个响应提供令牌，实现高效的验证。

#### 废弃和更新缓存

如果你设置了缓存时间，那么在这个缓存时间内资源发生了更新咋办？

变更文件名，webpack chunk name，强制用户下载更新。这个时候请求地址变了肯定需要从新请求。





## Cookie

### 1. Cookie 

> Cookie（复数形态Cookies），类型为「小型文本文件」，指某些网站为了辨别用户身份而储存在用户本地终端上的数据。

#### 1.1 Cookie 有什么用？

为了解决 `HTTP` 无状态导致的问题中，客户端与服务端会话状态的问题。这个状态单指后端服务的状态而非通信协议的状态。

1. 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
2. 个性化设置（如用户自定义设置、主题等）
3. 浏览器行为跟踪（如跟踪分析用户行为等）

#### 1.2 Cookie 有哪些部分组成？

作为一段一般不超过 4KB 的小型文本数据，它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。

+ Name / Value

  + 用 JavaScript 操作 Cookie 的时候注意对 Value 进行编码处理。

+ Expirse

  + 用于设置 Cookie 的过期时间。 
  + 当 Expires 属性缺省时，表示是会话性 Cookie。关闭浏览器失效。有些浏览器提供了会话恢复功能，这样会保存 Cookie。
  + 过期的时间只与客户端相关，而不是服务端。

+ Max-Age

  + 用于设置在 Cookie 失效之前需要经过的秒数

    ```js
    res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
    ```

  + Max-Age 可以为正数、负数、甚至是 0。

  + 如果 max-Age 属性为正数时，浏览器会将其持久化，即写到对应的 Cookie 文件中。

  + 当 max-Age 属性为负数，则表示该 Cookie 只是一个会话性 Cookie。

  + 当 max-Age 为 0 时，则会立即删除这个 Cookie。

  + 假如 Expires 和 Max-Age 都存在，Max-Age 优先级更高。

+ Domain

  + 指定了 Cookie 可以送达的主机名

  + 没有指定默认是当前主机部分（不含子域名）

    ```http
    .xxx.com
    ```

+ Path

  + Domain 和 Path 标识共同定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL

+ Secure

  + 标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端

+ HTTPOnly

  + 设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。

+ #### SameSite

  *Chrome80 版本中默认屏蔽了第三方的 Cookie*

  + SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。
    + **Strict**浏览器将只发送相同站点请求的 Cookie,当前网页 URL 与请求目标 URL 需完全一致。
    + **Lax** 允许部分第三方请求携带 Cookie
    + **None** 无论是否跨站都会发送 Cookie
  + 之前默认是 None 的，Chrome80 后默认是 Lax。

#### 1.3 如何查看 Cookie ? 

+ 可以在浏览器的开发者工具中查看到当前页面的 Cookie
+ 可以在计算机上查看本机的 Cookies 文件 (<small>以 Mac 为例</small>)
  + 路径为:`/Users/haizhi/Library/ApplicationSupport/Google/Chrome/Default`
  + 它是一个 `sqlite` 数据库文件，可以用 `sqlite` 客户端打开查看。

#### 1.4 怎么设置 Cookie

1. 客户端发送 HTTP 请求到服务器

   ```js
   // 登录
   export const reqLogin = data => request('/login', 'POST', data)
   ```

2. 当服务器收到 HTTP 请求时，在响应头里面添加一个 Set-Cookie 字段 (<small> `express` 为例</small>)

   ```js
   router.post('/login', (req, res) => {
     // if success
     res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
   })
   ```

3. 浏览器收到响应后保存下 Cookie

   收到响应：

   ![setCookie](/Users/haizhi/personal/awesome/docs/img/set-cookie.jpg)

   保存 Cookie:

   ![cookie的存储](/Users/haizhi/personal/awesome/docs/img/cookie_store.jpg)

4. 之后对该服务器每一次请求中都通过 Cookie 字段将 Cookie 信息发送给服务器。

   ![发送Cookie](/Users/haizhi/personal/awesome/docs/img/send-cookie.jpg)

#### 1.5 Cookie 的缺点

+ 大小方向
+ 安全方向
+ 增加请求方向

## 请求库默认携带 cookie 的情况

+ fetch

  + `fetch` 在默认情况下, 不管是同域还是跨域`` ajax` 请求都不会带上`cookie`, 只有当设置了 `credentials` 时才会带上该 `ajax` 请求所在域的 `cookie`, 服务端需要设置响应头 `Access-Control-Allow-Credentials: true`, 否则浏览器会因为安全限制而报错, 拿不到响应

  ```js
  fetch(url, {
      credentials: "include", // include, same-origin, omit
  })
  // include: 跨域 ajax 带上 cookie
  // same-origin: 仅同域 ajax 带上 cookie
  // omit: 任何情况都不带 cookie
  ```

  

+ axios

  + `axios` 和 `jQuery` 在同域 `ajax` 请求时会带上 `cookie`, 跨域请求不会, 跨域请求需要设置 `withCredentials` 和服务端响应头

  ```js
  axios.get('http://server.com', {withCredentials: true})
  ```

  

