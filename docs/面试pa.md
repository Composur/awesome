---
sidebar: auto
---
### 1.自我介绍
### 2.Event Loop
  #### NodeJS中的Event Loop
  #### 浏览器中的Event Loop
  #### 二者的区别
  + 浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。
### 3.解释函数柯里化

```js
function add(a,b) { return a + b }
add(1, 2) => 3
// 对于以上函数如果使用柯里化可以这样改造
function add(a) {
    return b => {
        return a + b
    }
}
add(1)(2) => 3
```

  1. 通过闭包保存了外部的一个变量，
        2. 然后返回一个接收参数的函数，在该函数中使用了保存的变量，然后再返回值。
            3. 偏函数
  ```
  f(x,y)=x+2y
  //固定x，得到关于y的新函数，固定来一个自变量，（全函数是都传）
  f(1,y)=1+2y=g(y)
  ```
  3. 一个函数返回一个函数
  4. underscore中的 _.partial()
  ```
  const add=function(x,y){
    return x+y
  }
  const g=_.partial(add,1)
  g(1)//2
  ```
### 4.解释闭包的优点及应用
### 5.解释原型链
### 6.说几个flex的属性，说几种水平垂直居中
### 7.Dom Diff 的原理
### 8.读过 react 源码吗？
### 9.如何设计移动端的适配？
### 10.谈谈web性能优化
### 11.输入url发生了啥
### 12.说一下 CORS 的缺点，以及jsop的实现方式
  + Web前端事先定义一个用于获取跨域响应数据的回调函数，并通过没有同源策略限制的script标签发起一个请求（将回调函数的名称放到这个请求的query参数里），然后服务端返回这个回调函数的执行，并将需要响应的数据放到回调函数的参数里，前端的script标签请求到这个执行的回调函数后会立马执行，于是就拿到了执行的响应数据。JSONP只能发起GET请求
  + JSONP只支持GET请求，CORS支持所有类型的HTTP请求
  + JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据
### 13.说一下什么是XSS,CSRF，如何预防
### 14.出了一个题说出this的指向
### 15.call、apply、bind的区别
### 16.说出防抖和节流的区别
### 17.重绘和回流的区别

​	`repaint`重绘，当页面中的元素只需要更新样式风格不影响布局，比如更换背景色background-color，这个过程就是重绘。

### reflow 回流

**盒模型**相关的属性: width，height，margin，display，border，etc

**定位属性及浮动**相关的属性: top,position,float，etc

改变节点内部**文字结构**也会触发回流: text-align, overflow, font-size, line-height, vertival-align，etc

### 18.解释一下 react 的 setState
### 19.git的原理,git和svn的区别
### 20.说一下正向代理和反向代理的区别

正向代理其实是客户端的代理,反向代理则是服务器的代理。 正向代理中，服务器并不知道真正的客户端到底是谁；而在反向代理中，客户端也不知道真正的服务器是谁。 作用不同。 正向代理主要是用来解决访问限制问题；而反向代理则是提供负载均衡、安全防护等作用

### 21.cookie和session的区别

> Cookie（复数形态Cookies），类型为「小型文本文件」，指某些网站为了辨别用户身份而储存在用户本地终端上的数据。

Cookie 的出现只是为了**解决客户端与服务端会话状态的问题。**

我们可以在浏览器中查看 Cookie 但是这并不意味着 Cookie 文件只是存放在浏览器里的，在 Mac 中`/Users/username/Library/Application Support/Google/Chrome/Default`中会存放一个 `Cookies`的 `SQLit`数据库文件。





### 22.sessionStorage和localStorage的区别
### 23.webPack的dev和product的区别
  + 在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间
### 24.平时如何debug
### 25.如何mock 数据
### 26.浏览器的强缓存和协商缓存
### 27.什么情况下会阻塞DOM渲染
### 28.什么是纯函数、高阶函数，二者的区别
  1. 纯函数
  2. 高阶函数（满足一个）

    + 接受一个或多个函数作为输入
    + 输出一个函数
    + redux的connect()()，setTimeout(),foreach()等
  3. 高阶组件

    + 本质是一个函数，接收一个组件，返回一个组件，新组件内部渲染传入的组件
    + 传入的组件向新组件传入属性
    + 为了扩展组件的功能
### 29.前端单元测试
  #### 什么是单元测试？
  1. 对软件中最小可测试单元进行测试，例如一个方法
  #### 好处
  1. 分模块开发，方便定位问题
  2. 保证代码质量
  3. 驱动开发，开发进步
  #### 类型
  1. TDD 测试驱动 我需要什么不是就是错误
  2. BDD 行为驱动 应该是什么不是就是错误
  #### 内容
  1. 框架
  2. 断言库
### 30.mixin
  1. 把第二个对象的属性值拷贝给第一个属性，类似Object.assign()
  ```
  var mixin=function(a,b){
    for(let key in b){
      a[key]=b[key]
    }
  }
  ```
### setTimeout和setInterval的区别
  1. 
