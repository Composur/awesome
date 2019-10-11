1. file system
2. net
3. process 进程的信息
4. os 和操作系统相关
  + 通过调用V8层面的方法例如getCpus是通过internalBinding('os')通过调用C++模块
5. EventEmitter
  + 观察者模式
    + addEventListener
    + removeEventListener
  + 调用 vs 抛事件
    + 关键在于不知道被通知者存在
    + 以及没有人听还能继续下去