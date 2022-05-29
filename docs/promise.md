

# Promise

Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行。

Promise 会有三种状态

- `Pending` 等待
- `Fulfilled` 完成
- `Rejected` 失败

状态只能由 Pending   &rarr;  Fulfilled 或者 Pending   &rarr;  Rejected，且一但发生改变便不可二次修改；

Promise 中使用 resolve 和 reject 两个函数来更改状态；

then 方法内部做的事情就是状态判断

- 如果状态是成功，调用成功回调函数
- 如果状态是失败，调用失败回调函数

## Promise A+ 的简单实现

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    executor(this.resolve, this.reject)
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  }
  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    }
  }
}


```

## 实现异步处理

如果加入异步上面的代码就有问题

```js
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})
```

因为 setTimeout 是异步代码这个时候 then 方法会同步执行，但是这个时候的 status 是 pending，所以在执行 then 方法的时候

```js
// MyPromise.js
then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  }
}
```

因为`this.status === PENDING` 所以不会执行里面的回调。想要执行的话需要在状态是 `PENDING` 的时候存储一下回调函数待到异步完成的时候再执行。

定义变量进行存储

```js
else if (this.status === PENDING) {
  // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
  // 等到执行成功失败函数的时候再传递
  this.onFulfilledCallback = onFulfilled;
  this.onRejectedCallback = onRejected;
}
```

setTimeout 等异步逻辑完成，且执行 resolve 的实时再执行存储的函数

```js
resolve = (value) => {
  if (this.status === PENDING) {
    this.status = FULFILLED;
    this.value = value;
    // 判断成功回调是否存在，如果存在就调用
    this.onFulfilledCallback && this.onFulfilledCallback(value);
  }
}
```

## 实现 then 多次调用

因为 then 可能被多次调用，所以需要用数组进行存储

```js
else if (this.status === PENDING) {
  this.onFulfilledCallbacks.push(onFulfilled);
  this.onRejectedCallbacks.push(onRejected);
}
```

并遍历执行存储的回调

```js
resolve = (value) => {
    while (this.onFulfilledCallbacks.length) {
      // 执行每一项
      this.onFulfilledCallbacks.shift()(value)
    }
  }
}
```

## 实现 then 链式调用(同步执行)

> then 方法要链式调用那么就需要返回一个 Promise 对象
> then 方法里面 return 一个返回值作为下一个 then 方法的参数，如果是 return 一个 Promise 对象，那么就需要判断它的状态

直接进行链式调用，这个时候会报错 `Cannot read property 'then' of undefined`

```js
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return new MyPromise((resolve, reject) => {
    // 目前这里只处理同步的问题
    resolve('success')
  })
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})
```

需要改造一下 `MyPromise.js`

```js
// MyPromise.js

class MyPromise {
  ......
  then(onFulfilled, onRejected) {
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
   	return new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        // 传入 resolvePromise 集中处理
        resolvePromise(onFulfilled(this.value), resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    }) 
}
	
function resolvePromise(x, resolve, reject) {
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

```

注意：这只是同步的情况，不支持异步，



