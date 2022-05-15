---
sidebar: auto
---
# 面试题汇总
## 腾讯

+ 虚拟 DOM 
  + 如何对比
  + 为什么要用

+ React 和 Vue 的区别

+ HTTP 2.0 新特性

+ HTTPS 加密原理
  + 什么是多路复用
+  前端安全
  + 前端请求安全 token 
  + csrf 原理 解决方案

+ 跨域
  + JSONP 原理

  ```js
  $.ajax({
    url:"http://crossdomain.com/jsonServerResponse",
    dataType:"jsonp",
    type:"get",//可以省略
    jsonpCallback:"show",//->自定义传递给服务器的函数名，而不是使用jQuery自动生成的，可省略
    jsonp:"callback",//->把传递函数名的那个形参callback，可省略
    success:function (data){
    console.log(data);}
  });
  
  ```

  

+ cors 原理

+ Cookie

  + 为什么不安全

+ HTTP 缓存

+ 浏览器事件循环

+ JS 异步编程

+ 深拷贝

+ for...in， for...of 的区别


+ 浏览器对301重定向和302重定向的处理


## xx公司：
+ react 组件间的通信方式都有哪些详细说明
+ 父子组件执行生命周期的优先级
+ 如果列表有相等的key会引起哪些问题？
+ 虚拟 DOM的作用、  dom diff 算法 
+ 判断回环链表
+ react 的fiber 架构
+ nodejs 中间件
+ reducer的更新流程
+ setSate 何时异步 何时同步
+ 前端发版流程
+ 前端工程建设
+ eslint 规范
+ 其它都是根据项目提问

## [平安](./面试pa.md)





## 编程题汇总

### typeof vs instanceof

二者都可以用来判断数据类型

+ typeof 返回的是一个字符串，instanceof 返回的是一个布尔值
+ typeof 可以判断除 null 外的基础类型，另外无法准确判断除 function 外的引用类型
+ instanceof 可以准确判断引用类型，但是无法判断基础类型
+ `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。 



实现Promise

实现xss-filter

实现正则获取url params

合并n个有序链表

渲染一个超长的list，实现dom节点的复用

random7实现random10

实现正则切分千分位（10000 => 10,000）

实现正则切分银行卡卡号（像实体卡一样四位一个空格）

实现jsonp

判断一个ipv4地址是否存在已有的1000万条ipv4地址中（bitmap）

实现bind，实现new

一次可以走一步或者两步，n个阶梯的楼梯有多少种走法

实现扫雷（二维数组，随机分布地雷坐标）

计算累进税率

求一个数组中比左边和右边的元素都大的元素（On）

实现双向绑定

实现InputNumber

数组扁平化、去重、排序

div块拖拽，考虑到边界

两个大数相加