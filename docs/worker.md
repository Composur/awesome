# worker

## API

- Worker.onerror：指定 `error` 事件的监听函数。
- Worker.onmessage：指定 `message` 事件的监听函数，发送过来的数据在`Event.data`属性中。
- Worker.onmessageerror：指定 `messageerror` 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 `Worker` 线程发送消息。
- Worker.terminate()：立即终止 `Worker` 线程。

## 用法

**分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源**

**Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。**

```js
// 主线程
// /worker.js 位于当前服务的根路径
const worker = new Worker('/worker.js', { name : 'myWorker' });
// 向 Worker 线程发消息
worker.postMessage({method: 'echo', args: ['Work']});
// 接受 Worker 线程发的消息
worker.onmessage = (data)=>{
  // data: 'Worker 已收到！'
}



// Worker 线程
self.name 
// 
self.onmessage = ({data}) = >{
  // data:{method: 'echo', args: ['Work']}
  postMessage('Worker 已收到！')
}
```

## 实践

**实现一个定时轮询**

主线程

```js
// 主线程
// /worker.js 位于当前服务的根路径
const worker = new Worker('/worker.js', { name: 'myWorker' });
// 向 Worker 线程发消息
worker.postMessage({ cmd: 'start', time: 1000 });
// 接受 Worker 线程发的消息
worker.onmessage = ({ data }) => {
  console.log(data)
  if (data.count > 3) {
    worker.postMessage({ cmd: 'stop' });
    console.log('关闭主线程')
    worker.terminate()
    return
  }
  worker.postMessage({ cmd: 'start', time: 1000 });
}
```



加载的子线程

```js
// Worker 线程
self.name
let count = 0
const callback = (time) => {
  const data = {
    text: `${time}ms后打印,打印了${count}次`,
    count,
  }
  self.postMessage(data)
}
let timer = null
self.onmessage = ({ data }) => {
  if (data.cmd === 'stop') {
    console.log('关闭子线程')
    self.close()
  }
  if (data.cmd !== 'start') return
  clearTimeout(timer)
  timer = setTimeout(() => {
    count++
    callback(data.time)
  }, data.time)
}
```