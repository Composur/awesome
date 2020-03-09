

## Node.js 简介

### 1. Node 环境的 js 和 Chrome 环境的 js 运行的不同点

+ Nodejs 没有浏览器的 API，如 document、window等。
+ 加入了许多 NodeJS 的 API。
+ Js 控制浏览器，Node.js 控制计算机。

### 2. Node.js 应用领域

+ web 服务
  + 搜索引擎优化，首屏加速。采取服务端渲染。
+ 客户端应用
  + 在已有网站的情况下，需要开发新的客户端
  + 用 Node.js 客户端技术 （electron）实现，最大限度的复用现有的工程。

### 3. BFF 层

> Backend for Frontend 为前端服务的后端

![bff](./img/bff.jpg)



+ 对用户侧提供 HTTP 服务
+ 使用后端 RPC 服务 

### 4. 小游戏

#### 4.1 实现步骤

[石头✂️布](https://github.com/Composur/v2ex-nodejs/tree/master/CommonJS)

输入你要出的类型回车即可。

![](./img/WechatIMG219.jpeg)

用到了 `process` 较多的的属性。如` argv` 、`stdin`...

步骤：

1. 取到用户的控制台输入

   ```js
   const userAction = process.argv[process.argv.length - 1]
   ```

2. 运算逻辑

   ```js
   // 如果没有导出 其它文件引入该文件默认是一个空对象
   module.exports = function (userAction) {
     const { log } = console
     // 计算机随机出一个
     let random = Math.random() * 3
     let computerAction;
     const rock = 'rock', paper = 'paper', scissor = 'scissor';
     if (random < 1) {
       computerAction = rock
     } else if (random > 2) {
       computerAction = paper
     } else {
       computerAction = scissor
     }
     log(`你出了${userAction}；计算机出了${computerAction}`)
     if (userAction === computerAction) {
       log('平局！！')
       return 0
     } else if (
       (userAction === rock && computerAction == scissor) ||
       (userAction === paper && computerAction == rock) ||
       (userAction === scissor && computerAction == paper)
     ) {
       log('你赢了！！')
       return -1
     } else {
       log('你输了！！')
       return 1
     }
   }
   ```

3. 监听输入

   ```js
   const playAction=require('./lib/common') 
   let result=0;
   // 让程序不中断，一直执行
   process.stdin.on('data',e=>{
     const userInputValue=e.toString().trim()
     result= playAction(userInputValue)
     if(result==-1){
       result++
       console.log(result)
     }
     if(result===3){
       console.log('你太厉害了！！')
       process.exit()
     }
   })
   ```

#### 4.2 CommJS 规范

##### 4.2.1 没有规范出现的问题

1. 没有 `<script></script> `就写不了 js 代码
2. 脚本变多的时候需要手动加载管理
3. 不同脚本间的调用，需要通过全局变量的方式。

##### 4.2.2 Require()

如何引入一个 js

```js
// a.js
console.log('a.js')
export.a = 'a'

// b.js
const lib = require('a.js')
// 如果没有 export.xx 进行导出的话 require 引入的默认是一个空对象
console.log(lib) // {a:'a'}
```

问题：b.js 中 lib 的引用和 a.js 是否是同一个引用 ？**答案：是统一引用**

```js
// a.js
console.log('我是a.js')
setTimeout(()=>{
  console.log(exports) //  1 秒后打印 { addNewProperty: '我是b.js中新增加的属性' }
},1000)


// b.js
const lib = require('./a')
console.log('我是b.js',lib) // 我是b.js {}
lib.addNewProperty = '我是b.js中新增加的属性'
```

##### 4.2.3 module.exports vs exports

`module.exports ` 会把所有 `exports ` 导出覆盖掉。

 ```js
// a.js
exports.hello = '我是a.js'
setTimeout(()=>{
  console.log(exports) // { hello: '我是a.js' }
},1000)

module.exports=function test(){
  console.log('我是a.js导出的function')
}

// b.js
const lib = require('./a')
console.log('我是b.js',lib) // 我是b.js [Function: test]
lib.addNewProperty = '我是b.js中新增加的属性'
console.log(lib.hello) // undefined
 ```

##### 4.2.4 Webpack 中的 CommonJS

Webpack 会把所有的 .js 文件分析一遍，然后打包成一个大的 main.js 文件。在这个 main.js 中每个所有的 .js 文件以一个函数的形成存在。

```js
//a.js
console.log('a.js')

//b.js
console.log('b.js')
```

webpack 打包后：

```js

/***/ "./a.js":
(function(module, exports) {
	eval("console.log('a.js')\n\n//# sourceURL=webpack:///./a.js?");
}),
   
/***/ "./b.js":
(function(module, exports) {
	eval("console.log('b.js')\n\n//# sourceURL=webpack:///./b.js?");
}),
  
/***/ "./index.js":
(function(module, exports, __webpack_require__) {
	eval("__webpack_require__(/*! ./a */ \"./a.js\")\n__webpack_require__(/*! ./b */ \"./b.js\")\nconsole.log('index.js')\n\n//#sourceURL=webpack:///./index.js?");
 })
```



会有一个函数

```js
// 传入一个 id  入口
/******/ 	function __webpack_require__(moduleId) {
/******/		// 是否有缓存
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
  					// 返回上一次的结果
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
  					// 如果没有命中缓存
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
  					// 调用模块
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
```

### 5. Node.js 内置模块

![nodejs](./img/nodejs.jpg)

根据上图所示，由 JavaScript 到 V8 再到 Node.js 的能力大部分是由内置模块提供的，所以我们必须要了解一些核心 `fs` `os` `net` `Process` ... 等模块。

#### 5.1 js 和 node.js 的交互

例如我们想通过 js 获取计算机的 `cpu` 信息：

1. 打开 node 的 [os.js](https://github.com/nodejs/node/blob/master/lib/os.js) 模块（在 lib 文件夹里面）。

```js
const {
  getCPUs,
  ...
} = internalBinding('os'); // internalBinding 是 V8 的方法 

function cpus() {
  // 通过引入的 os 得到 getCPUs() 
  const data = getCPUs() || [];
  const result = [];
  let i = 0;
  while (i < data.length) {
    result.push({
      model: data[i++],
      speed: data[i++],
      times: {
        user: data[i++],
        nice: data[i++],
        sys: data[i++],
        idle: data[i++],
        irq: data[i++]
      }
    });
  }
  return result;
}

module.exports = {
  cpus, // 一个方法
  ...
};
```

2. C++ 提供的方法

[node_os.cc](https://github.com/nodejs/node/blob/master/src/node_os.cc)

```c++
// node_os.cc
//  v8 转化 js

static void GetCPUInfo(const FunctionCallbackInfo<Value>& args) {
  Environment* env = Environment::GetCurrent(args);
  Isolate* isolate = env->isolate();

  uv_cpu_info_t* cpu_infos;
  int count;

  int err = uv_cpu_info(&cpu_infos, &count);
  if (err)
    return;
  
  std::vector<Local<Value>> result(count * 7);
  for (int i = 0, j = 0; i < count; i++) {
    uv_cpu_info_t* ci = cpu_infos + i;
    result[j++] = OneByteString(isolate, ci->model);
    result[j++] = Number::New(isolate, ci->speed);
    result[j++] = Number::New(isolate, ci->cpu_times.user);
    result[j++] = Number::New(isolate, ci->cpu_times.nice);
    result[j++] = Number::New(isolate, ci->cpu_times.sys);
    result[j++] = Number::New(isolate, ci->cpu_times.idle);
    result[j++] = Number::New(isolate, ci->cpu_times.irq);
  }
	
  // C++ 的方法去获取 cpu 信息
  uv_free_cpu_info(cpu_infos, count);
  
  // 转成 js 能用的
  args.GetReturnValue().Set(Array::New(isolate, result.data(), result.size()));
}


void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context,
                void* priv) {
  Environment* env = Environment::GetCurrent(context);
  
  // 这里提供了 GetCPUInfo 方法
  env->SetMethod(target, "getCPUs", GetCPUInfo);
	...
  target->Set(env->context(),
              FIXED_ONE_BYTE_STRING(env->isolate(), "isBigEndian"),
              Boolean::New(env->isolate(), IsBigEndian())).Check();
}
```

#### 5.2 实现一个事件收发器

操作系统底层通过 node.js 到 js 的过程，用我们上面的小游戏举例（node环境）：

```js
// 获取控制台的输入
// 这里用到了 EventEmitter 模块
process.stdin.on('data',e=>{
  const userInputValue=e.toString().trim()
  ...
})
```

`EventEmitter` 可以从 node 层抛出一些数据给 js 

**观察者模式**举例：

> 观察者（Observer）模式的定义：指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。这种模式有时又称作发布-订阅模式、模型-视图模式，它是对象行为型模式。

后端每隔 2 秒通知一次前端：

*observer(观察者)*

```js
const EventEmitter=require('events').EventEmitter
class Test extends EventEmitter{
  constructor(){
    super()
    setInterval(() => {
      // 发射事件，给外面的业务代码抛出一些东西出去
      this.emit('listen',{date:Date(),test:'2秒触发一次'})
    }, 2000);
  }
}
module.exports=Test
```

*subscribe(订阅者)*

```js
const Test = require('./lib/EventEmitter') 
const test01 = new Test 

// 接收事件
test01.addListener('listen',(res)=>{
  // 这里可以进行业务逻辑处理
  console.log(res)
})

// {
//   date: 'Sat Mar 07 2020 21:10:50 GMT+0800 (GMT+08:00)',
//   test: '2秒触发一次'
// }
// {
//   date: 'Sat Mar 07 2020 21:10:52 GMT+0800 (GMT+08:00)',
//   test: '2秒触发一次'
// }
// {
//   date: 'Sat Mar 07 2020 21:10:54 GMT+0800 (GMT+08:00)',
//   test: '2秒触发一次'
// }
```

这样我们就实现了一个简单的事件收发器。这样做的缺点是：

1. 不知道被通知者是否存在。被通知者也不知道通知者是否存在。
2. 不知道被通知者是谁，谁都可以被通知到，广播的性质。

### 6. Node.js 的异步、非阻塞 I/O

> 阻塞 I/O 非阻塞 I/O 的区别就是：**系统在接收输入再到输出期间，还能不能再接收其它输入**。
>
> "I/O" 主要指由 [libuv](https://libuv.org/) 支持的，与系统磁盘和网络之间的交互。

[阻塞对比非阻塞一览](https://nodejs.org/zh-cn/docs/guides/blocking-vs-non-blocking/)

####  6.1 同步（阻塞）举例：

在学校食堂窗口买饭，需要到窗口排队，你必须等到排到你才能选餐。需要等待。

<small>插队什么的不在考虑范围，会被女同学骂</small>。

#### 6.2 异步（非阻塞）举例：

去外面餐厅吃饭，进门就有服务员招呼你点餐，不用等待就可以选餐。

<small>餐厅生意火爆需要等几个小时的不在此考虑范围。</small>

#### 6.3 [nodejs中的阻塞与非阻塞](https://nodejs.org/zh-cn/docs/guides/blocking-vs-non-blocking/)

+ 照搬链接中的同步举例：

```js
const fs = require('fs');
// 文件的读取会耗时，这里会发生阻塞
const data = fs.readFileSync('/file.md'); 
console.log(data);
// 因为代码会同步执行，所以必须等到打印出 data 后，才能进行其他任务的处理
moreWork(); 
```

+ 异步非阻塞：

```js
const fs = require('fs');
// 这里是非阻塞的
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork();// 不必等到文件读取结束就可以执行此方法，此方法的执行不受文件读取的影响。
```

这个例子就是 nodejs 的核心：**异步非阻塞 I/O**。用等待时间，去做其它的事情，充分利用 CPU 。

**`nodejs` 通过一个 [libuv](https://libuv.org/) 实现了异步非阻塞 I/O , 上面的操作（点餐）都是在一个线程里面进行，通过  [libuv](https://libuv.org/) **

**把大量的计算分发给 `C++` 的众多模块去做，等到计算完成再把结果返回给 `nodejs` 线程，然**

**后`nodejs` 再把结果返回给应用程序。**

以去餐厅点餐为例：**`JavaScript + v8 + nodejs + libuv ` 就是服务员，`libuv + C++` 模块就是后厨**。<small> `libuv` 一半是服务员，一半是后厨。</small>

#### 6.4 事件循环

每次点餐都是一个新的线程（你对服务员说，服务员再通知后厨做），例如：

+ 点一份生蚝炒蛋，开启线程一。
+ 点一份蒜蓉西蓝花，开启线程二。

**模拟 eventloop ** 极简版

```js
// 用队列 模拟调用栈
const eventLoop = {
  queue: [],
  init() {
    this.loop()
  },
  loop() {
    // 循环检测队列
    //每一次事件循环都是一次全新的调用栈，从这里开始才是js代码，之前都是c++
    while (this.queue.length) { 
      const callback = this.queue.shift()
      callback() //这里就是nodejs调用栈的底部
    }
    // 每隔 50ms 检测一次，这是模拟的情况，实际会更快。
    setTimeout(this.loop.bind(this), 50) 
  },
  // 添加函数
  add(callback) {
    this.queue.push(callback)
  }
}

eventLoop.init()


// 下面的代码可以理解为是 C++ 代码的处理过程

// 这是生蚝炒蛋的处理
setTimeout(() => {
  eventLoop.add(() => {
    console.log(500)
  })
}, 500)

// 这是蒜蓉西蓝花的处理
setTimeout(() => {
  eventLoop.add(() => {
    console.log(1000)
  })
}, 1000)
```



### 7. Node.js 异步编程 -- callback

#### 7.1 callback 规范

+ error-first callback
+ Node-style callback 

**第一个参数是 `error ` 后面的才是结果。**

```js
callback(err,result)
```

为什么需要这样，我们看一个例子：

下面会抛出一个全局的 `error`  

```js
function interview(callback) {
  const random = Math.random();
  console.log(random);
  setTimeout(function() {
    if (random > 0.5) {
      callback(random);
    } else {
      throw new Error("error");
    }
  }, 500);
}

try {
  interview(function(res) {
    console.log(res);
  });
} catch (error) {
  // 我们期望能够在这里捕获 error ,但是并没有。
  // nodejs 抛出了一个全局的错误，并使程序中断。这是非常可怕的结果。
  console.log("error", error);
}

// 0.10791201989335986
// /Users/haizhi/personal/v2ex-nodejs/async/callback.js:8
//       throw new Error("error");
//       ^

// Error: error
//     at Timeout._onTimeout (/Users/haizhi/personal/v2ex-nodejs/async/callback.js:8:13)
//     at listOnTimeout (internal/timers.js:531:17)
//     at processTimers (internal/timers.js:475:7)
```

为什么会这样？`throw` 是在 `interview` 里面抛出的。但是并没有被 `catch` 捕获到。

这就需要了解 node.js 的事件循环机制，因为每一次都是一次新的调用，`interview()` 和它里面的 `setTimeout`根本不在一个调用栈里面。而 `setTimeout` 执行完再次进入主线程调用的时候已经不是在`interview` 中执行的了，所以捕获不到。

既然有这样的错误我们就采用另一种写法：`callback` 的写法

```js
function interview(callback) {
  const random = Math.random();
  console.log(random);
  setTimeout(function() {
    if (random > 0.5) {
      callback(null,random);
    } else {
      callback('error')
    }
  }, 500);
}

interview(function(err,result) {
  // 一般规定第一个参数不为空就是错误的结果
 if(err){
   console.log('error')
 }else{
   console.log('success',result)
 }
});

// 0.4136338806877633
// error
// 0.7680882379533018
// success 0.7680882379533018
```

#### 7.2 Promise

+ 在当期的事件循环中给不了你结果，但在未来的事件循环中会给到你结果。
+ 简单来说 Promise 就是一个容器，里面保存着未来才会结束的事件（通常是一个异步操作）
+ Promise 的构造函数接收一个执行函数，执行函数执行完同步或则异步操作后，调用它的两个参数 `resolve` 和 `rejected`。这两个函数分别只能只能接受一个参数。
+ Promise 有三种状态` padding`（进行中）、`fulfilled`（成功）、`rejected` （失败）。
+ Promise 对象的改变只有从 `pending` 变为 `fulfilled`或 `rejected`，改变后状态就凝固了，然后在`.then(result)`就会得到这个结果。
+ 任何一个 `rejected` 状态且后面没有 `catch` 的` Promise`，都会造成浏览器或 `node` 环境的全局错误。 

模拟一个  Promise

```js
function Promise_(construstor) {
  const _this = this;
  const pending = 'pending'
  this.status = pending;
  this.value = undefined;
  this.reason = undefined;

  function resolve(value) {
    if (_this.status === pending) {
      _this.status = "resolved";
      _this.value = value;
    }
  }
  function reject(reason) {
    if (_this.status === pending) {
      _this.status = "rejected";
      _this.reason = reason;
    }
  }


  try {
    construstor(resolve, reject);
  } catch (error) {
    reject(error)
  }
}

Promise_.prototype.then = function(onfullfiled,onrejected) {
  const _this = this
  switch (_this.status) {
    case "resolved":
      onfullfiled(_this.value);
      break;
    case "rejected":
      onrejected(_this.reason);
      break;
      default:
  }
};

var p = new Promise_(function(resolve,reject){resolve(1)});
console.log(p) // Promise_ { status: 'fulfilled', value: 1, reason: undefined }
p.then(function(x){console.log(x)}) // 1
```

出现的意义是为了解决异步流程控制问题。

#### 7.3 Async、await

##### 7.3.1 Aaync 和 Promise 的关系

先下面代码执行后的结果：

```js
const promise =(
  function(){
    return new Promise(resolve=>{
      resolve()
    })
}
)()
// Promise {<resolved>: undefined}
const asyncFn= (
  async function(){
  
  }
)()
// Promise {<resolved>: undefined}
```

均为：<code>Promise {<resolved>: undefined}</code> 。

得出结论：

**`async` 就是一个返回 `Promise` 的函数，是 `Promise` 的语法糖**

`async` 根据内部的返回值进行 `resolve` `reject`

##### 7.3.2 await

+ **`await` 以同步的方式写异步**

+ `try-catch` 可以获取到 `await` 的错误

+ 可以暂停 `function` 的执行

  ```js
  async function wait(){
    // 暂停执行
    await fetch('http://go')
    
    doSomethingWork()
  }
  ```

  

### 8. HTTP 服务

+ 解析进来的 HTTP 请求报文
+ 返回对应的 HTTP 响应报文

```js
// 一个简单的 http 服务
const server = require('http')
server.createServer(function(req,res){
  res.writeHead(200)
  res.end('success')
}).listen(3000)
```

#### 8.1 OSI 七层参考模型

#### 8.2 koa

微内核，不挂载任何中间件。为了弥补 Express 的不足而诞生

##### 8.2.1 中间件

在 Express 的中间件中，异步调用会开启另一个线程，返回的结果同一个中间件中的其它函数无法得到。但是 koa 可以 利用了 async、await

```js
// 得到程序执行完的时间
app.use(async (ctx, next) => {
  const start = Date.now();
  //  等待中间件的执行
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

##### 8.2.2 Context, Request and Response

```js
// Request and Response 都挂到 ctx 上。ctx.request,ctx.response
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'xml';
  ctx.response.body = fs.createReadStream('really_large.xml');
});
```

+ 请求和返回的处理更加明显,直接赋值。















