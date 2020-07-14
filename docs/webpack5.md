# webpack 5 

## 基础知识

我们用模块化的方式编写代码的时候，如果不借助构建工具大部分情况下是无法使用的，例如

```html
 <link rel="stylesheet" href="/reset.less">
```

这样在 `html`中引入是无法识别的。

`Webpack` 根据入口资源的依赖关系把 `js`、` css` 图片、字体等资源形成 `chunk`，就是代码块，按不同的资源进行处理例如：`less` &rarr;`css`，进行打包，打包后的输出叫做 `bundle`。

**webpack 自身只能处理`js`、`json`文件，不能处理样式文件和图片。**

前端目前的构建共建都是基于 `Node.js`平台运行的，所以模块化默认采用 `CommonJS`。

```js
module.exports = {
  
}
```



## 五个核心概念

+ Entry
  + 入口
+ Output
  + 输出
+ Loader
  + 处理那些非 `JavaScript` ,文件，例如 `img`等。类似翻译了一下。使之可以被使用。主要用来加载文件。
+ Plugins
  + 打包、优化、压缩、重新定义环境变量等等，是用来扩展功能的。例如生成 `HTML`文件。
+ Mode
  + Dev 和 Prd

