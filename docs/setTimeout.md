## requestAnimationFrame

**语法**：[requestAnimationFrame(callback)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame);

**定义**：告诉浏览器希望执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画。

该方法使用一个回调函数callback作为参数，这个回调函数callback会在浏览器重绘之前调用。回调频率通常是每秒60次。回调函数callback会被传入一个参数[DOMHighResTimeStamp](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)，指示从触发requestAnimationFrame回调到现在的时间。`requestAnimationFrame(callback)`会返回一个long整数，请求ID，也是回调列表中唯一的标识，一个非零值，可以传此值到 [cancelAnimationFrame(requestID)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)以取消回调函数。

requestAnimationFrame基本思想是利用显示器的刷新机制，与刷新频率保持同步，并利用这个刷新频率进行页面重绘更新。不过需要注意：*因为JavaScript单线程工作机制，如果主线程一直处于繁忙状态，那么requestAnimationFrame的动画效果也会受影响的。*

### 使用

使用requestAnimationFrame的时候，只需反复调用它即可：

```js
function animation() {
  // do something ....
  requestAnimationFrame(animation);
}

requestAnimationFrame(animation);
```

## setTimeout

**语法**：`setTimeout(function,delay)`

**定义**：`setTimeout()`方法用于在`delay`毫秒数之后调用函数或计算表达式。

`setTimeout()`指定的时间间隔**表示何时将定时器的代码添加到任务队列中，而不是何时执行代码。**

## setInterval

**语法**：`setInterval(function,delay)`

**定义**：`setInterval()`方法可按照指定的`delay`周期（以毫秒计）来调用函数或计算表达式。　

使用`setInerval()`创建的定时器确保定时器代码规则地插入任务队列中。不过仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。这种重复定时器会存在如下问题：

- 在某些间隔会被跳过
- 多个定时器的代码执行之间的间隔可能会被预期的小

可以通过如下链式setTimeout()调用模式来避免类似问题：

```js
setTimeout(function() {
  // do something. . . .
  setTimeout(arguments.callee, interval);
}, interval);

```



## setTimeout vs setInterval

1. 定时器 setTimeout 创建后返回一个定时器编号ID。由于共用编号池使得每次 setTimeout 返回的ID 不同，因此递归中 clearTimeout 最后执行的话仅能保证释放最后一次创建的定时器。
2. 之前生成的定时器虽然执行完毕但是根据垃圾回收机制执行时机的不确定性，很有可能内存一直有一堆未释放的计时器占用，所以需要每次创建前及时释放前一个已完成的计时器。

