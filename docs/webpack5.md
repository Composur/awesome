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

### source map 

> 调试原始源代码会比浏览器下载的转换后的代码更加容易。 [source map](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) 是从已转换的代码映射到原始源的文件，使浏览器能够重构原始源并在调试器中显示重建的原始源。

+ source map 较大，会不会影响性能？

  + source map 只有在打开 dev tools 的情况下才会开始下载，一般用户是不会打开的。
  + 浏览器 Network 一般是默认隐藏 source map 文件的加载，所以我们看不到，可以用抓包工具抓出来。

+ 浏览器是如何判断 source map 与原始文件的对应关系？

  + AST

+ source map 是如何一一对应到代码的？

  ```js
  // index.js
  const a = 1
  console.log(a);
  
  // 打包后 bundle.js
  console.log(1);
  //# sourceMappingURL=bundle.js.map
  
  ```

  `sourceMappingURL` 就是标记了该文件的 source map 地址。

+ 各种打包器和浏览器是怎么做到统一的？有什么标准码？

  + 存在一个标准。

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

  + 优先执行

    + 加入 enforce 属性

      ```
      enforce: 'pre'
      ```

      

+ Plugins

  + 打包、优化、压缩、重新定义环境变量等等，是用来扩展功能的。例如生成 `HTML`文件。

+ Mode

  + Dev 和 Prd



## 开发环境性能优化

+ 优化打包速度

  + HRM 只有 CSS

  + sourceMap 源代码到构建后代码的映射

    + inline 内联
      + 只生成一个 sourceMap
      + 可以追踪错误代码的准确信息，和源代码的错误位置。
    + hidden 外部
      + 可以追踪错误代码的准确信息，没有源代码错误位置。
    + eval 
      + 也是内联，不过每个文件都会生成一个 sourceMap
      + 可以追踪错误代码的准确信息，和源代码的错误位置。
      + 代码体积非常大。
    + nosources
      + 外部
      + 可以追踪错误代码的准确信息，没有源代码信息，隐藏源代码。
    + cheap
      + 外部
      + 可以追踪错误代码所在那一行的信息，不能精确定位到具体的列。
    + module
      + 和 cheap 效果一样

    构建速度

    eval > cheap > inline 

    ```
    devtool:eval-cheap-source-map
    ```

    调试更友好

    cheap-module-source-map

    一般推荐 eval-source-map

+ 优化代码调试

## 生成环境性能优化

+ 优化打包速度
+ 优化运行性能

### oneOf

`rules` 的属性，每个 `loader` 匹配一个，避免重复匹配。

注意：不能有两个配置处理同一类型文件。

### 文件缓存

+ hash
  + 文件每次缓存都会生成一个` hash`，每次打包都会重新生成
+ thunkhash
  + 根据 `chunk` 生成 `hash` ，如果打包来源同一个 `thunk` ，那么 `hash` 值一样，
  + `Js` 中引入` CSS` 二者 `chunkhash` 一致。
+ contenthash 
  + 根据文件内容生成的 `hash` 值，不同文件 `hash` 值不一样。

### 代码分割

+ optimization 将 nodeModules 的代码单独打包成一个 chunk，多入口的时候可以公共文件提取 。

  + splitchunks

  ```js
  optimization:{
    splitchunks:{
       chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
               // only package third parties that are initially dependent
              chunks: 'initial' 
            },
            elementUI: {
              // split elementUI into a single package
              name: 'chunk-elementUI', 
              priority: 20,
               // in order to adapt to cnpm
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ 
            },
            commons: {
              name: 'chunk-commons',
               // can customize your rules
              test: resolve('src/components'),
               //  minimum common number
              minChunks: 3, 
              priority: 5,
              reuseExistingChunk: true
            }
          }
    	}
  }
  ```

  

### 懒加载

 ```js
// 执行的时候才会加载
import(/* webpackChunkName:test */'./test').then({fn}=>fn())
 ```

### 预加载

```js
// 提前加载好，执行的时候取缓存
// 并行加载
import(/* webpackChunkName:test , webpackPrefetch:true */'./test').then({fn}=>fn())
```

### PWA

**配置**

```js
const WorkboxPlugin = require('workbox-webpack-plugin')
// 使用
new WorkboxPlugin.GenerateSW({
  // 快速启动
	clinetsClaim: true,
  // 删除旧的 serviceWorker
  skipWaiting: true
})
```



**使用**

```js
//入口文件
// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('sw 注册成功！')
    }).catch(() => {
      console.log('sw 注册失败！')
    })
  })
}

```



### 多进程打包

thread-loader

+ 进程的启动需要时间 600ms ,进程间的通信也有开销。适合打包时间较长的项目。



### 忽略依赖库的打包

external , 前提是你使用了 `CDN`.

```js
externals:{
	// 要忽略的包名
	jquery:'jQuery',
}
```



### 动态修改 webpack 打包路径

__webpack_public_path__ 是webpack特有变量，就是webpack在打包我们代码时外面包裹了一层函数，一些变量通过参数传递进来让我们可以在代码中使用，即使这些变量在宿主环境（比如浏览器）里面是没有的（像require，import，export等）。

我们只需给__webpack_public_path__赋值就可以改变公共路径，建议放在入口文件的最顶部，如下

```js
// publicConfig.js
__webpack_public_path__ = 'https://cdn.demo.com';

// 入口文件 index.js
import './publicConfig.js'   
import React from 'react';
import ReactDOM from 'react-dom';

```

**但是这种修改只针对js文件中的公共路径，对html中的css和js文件地址不起作用，css样式文件中通过url()方式引入的图片也无效。**

如果是`css in js`的形式，公共路径的动态修改`css`样式文件是生效的。

>  如果是create-react-app创建的项目，修改__webpack_public_path__可能会不生效，需要通过删除publicPath配置项来解决（是不设置而不是设置为空）



### webpack5 的新功能

+ 通过持久缓存提高构建性能

  + 之前是babel cache 等，现在有个 cache 属性。可以更好的缓存打包后的资源。

    ```
    cache:{
    	type: "filesystem",
    	buildDependencies: {
    		...
    	}
    }
    ```

    

+ 更好的算法和默认值来改善长期缓存

+ 更好的 tree-shaking 更加强大，不会打包没有使用的代码，改善打包后的体积

+ 



