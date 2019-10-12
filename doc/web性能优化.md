### web性能优化
#### 1.缓存
首次没有缓存
#### 2.DNS查询
  + 减少DNS查询
  + 放到一个域名下
#### 3.建立tcp链接
  + 复用连接数 请求头加上keep-alive
  + http2.0 多路复用
#### 4.发送请求
  + 减少cookie体积，不滥用cookie
  + 发送多个HTTP请求，增加域名（可以多发送http请求）和减少DNS查询（减少HTTP请求），进行权衡比较，文件多增加，文件少放到一起
  + Cache-Control:no-cache 是不发送请求
#### 5.接收响应
 + ETag：发送请求返回一个304用本地的
  + gzip压缩
#### 6.接收完成
  + 得到HTML
#### 7.解析HTML
  + 查看 DOCTYPE html
  + 逐行阅读
  + 发现标签<h1>
    + Chrome不渲染
      + 因为解析到css后会重新渲染样式，解析完css再渲染页面能避免重复渲染。
    + IE，Firefox直接渲染
#### 8.下载CSS
  + 增加域名,使用CDN（就近访问 ）下载多个css
  + css放到head里，js放到最后（尽早获取DOM节点）
  + Chrome会阻塞html渲染，IE不会
  + 可以同时下载8个，并行下载
  + IE能同时下载4个
#### 9.依次解析CSS
#### 10.看到JS
  + 懒加载
  + 有js就下载，不会执行JS
#### 11.下载JS
  + 会阻塞HTML
