---
sidebar: auto
---

# 腾讯一面

### 虚拟 DOM 

+ 如何对比
+ 为什么要用

### React 和 Vue 的区别

### HTTP 2.0 新特性

### HTTPS 加密原理

### 前端安全

+ 前端请求安全 token 

### 跨域

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

### Cookie

+ 为什么不安全

### HTTP 缓存

### 浏览器事件循环

### JS 异步编程

### 深拷贝

+ for...in， for...of 的区别



