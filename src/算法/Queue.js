const task = timeout => new Promise((resolve) => setTimeout(() => { resolve(timeout); }, timeout));
const taskList = [1000, 3000, 200, 1300, 800, 2000];
async function startNoConcurrentControl() {
  console.time();
  await Promise.all(taskList.map(item => task(item)));
  console.timeEnd();
}
startNoConcurrentControl();

// 队列可以保证任务并发执行的顺序 用数组来模拟队列
class Queue {
  constructor() {
    this._queue = [];
  }
  push(value) {
    return this._queue.push(value);
  }
  shift() {
    return this._queue.shift();
  }
  isEmpty() {
    return this._queue.length === 0;
  }
}

// 每一项任务的执行
class DelayedTask {
  constructor(resolve, fn, args) {
    this.resolve = resolve
    this.fn = fn
    this.args = args
  }
}

// 控制任务的执行
class TaskPool {
  constructor(num) {
    this.num = num
    this.Queue = new Queue()
  }
  addTask(fn, args) {
    return new Promise((resolve) => {
      this.Queue.push(new DelayedTask(resolve, fn, args));
      if (this.num) {
        this.num--;
        const { resolve: taskResole, fn: taskFn, args: taskArgs } = this.Queue.shift();
        taskResole(this.runTask(taskFn, taskArgs));
      }
    })
  }
  runTask(fn, args) {
    console.log(fn, args)
    if (!args) return
    const result = Promise.resolve(fn(...args));
    result.then(() => {
      this.num--
      this.pullTask()
    }).finally(() => {
      this.num--
      this.pullTask()
    })
    console.log(result)
    return result
  }
  pullTask() {
    if (this.Queue.isEmpty()) return
    if (this.num === 0) return
    this.num++
    const { resolve, fn, args } = this.Queue.shift()
    resolve(this.runTask(fn, args))
  }
}

const cc = new TaskPool(2);
async function startConcurrentControl() {
  console.time();
  await Promise.all(taskList.map(item => cc.addTask(task, [item])))
  console.timeEnd();
}

startConcurrentControl();