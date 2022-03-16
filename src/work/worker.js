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