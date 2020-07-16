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

  + 入口，发现依赖，利用 loader 进行处理。

+ Output

  + 输出

+ Loader

  + 处理那些非 `JavaScript` ,文件，例如 `img`等。类似翻译了一下。使之可以被使用。主要用来加载文件。

  ```js
  module:{
  	rules:[
      {
        test:/\.css$/,
        // 执行顺序，从下往上，从左到右。
        // 先利用 css-loader 把 css 文件转变为 commonjs 模块加载进 js 中，样式字符串。
        // 创建 style 标签，将 js 中的样式资源插入到 head 中
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:(/\.(jpe?g|png|gif|svg)$/),
        // url-loader 依赖于 file-loader
        // 这样写是处理不了 html 文件中的 img 的 src 的路径的，需要再使用 html-loader
        // 然后会发现在在html中的 img 的 src 路径变为了 [object Module]
        // 因为 url-loader 默认使用 es6 模块化解析，而 html 使用的 commonjs 规范
        // 解决办法：关闭 url-loader 的es6 模块化，使用 commonjs解析
        loader:'url-loader',
        options:{
          // 小于 8kb 就会转为 base64 字符串，浏览器会进行解析
          // 优点：减少 HTTP 请求次数，减轻服务器压力
          // 缺点：体积变大
          limit:8*1024,
          // 关闭 url-loader 的es6 模块化，使用 commonjs解析
          esModule:false,
          // 给图片重命名，因为经过 loader 处理图片名称都变成 hash 了
          // .[ext] 表示使用原来的扩展名
          name:'[hash:10].[ext]'
        }
      }
    ]
  }
  ```

  

+ Plugins

  + 打包、优化、压缩、重新定义环境变量等等，是用来扩展功能的。例如生成 `HTML`文件。

+ Mode

  + Dev 和 Prd

