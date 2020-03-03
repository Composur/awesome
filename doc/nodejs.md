

### Node.js 简介

#### 1. Node 环境的 js 和 Chrome 环境的 js 运行的不同点

+ Nodejs 没有浏览器的 API，如 document、window等。
+ 加入了许多 NodeJS 的 API。
+ Js 控制浏览器，Node.js 控制计算机。

#### 2. Node.js 应用领域

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

