## webpack 

### 代码检查

+ 加入 `eslint`

+ 加入 `stylelint`

  + 配置一些

    ```js
    module.exports = {
      'defaultSeverity': 'warning',
      'extends': ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
      'plugins': ['stylelint-scss'],
      'rules': {
        // 不要使用已被 autoprefixer 支持的浏览器前缀
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true
      }
    }
    
    ```

  + `.stylelintcache` 方便开发编译，开启后自动生成

+ 配置全局指令

### 自动 require 图片

以前在写 Vue 的时候经常会写到这样的代码：把图片提前 require 传给一个变量再传给组件

```vue
// page 代码
<template>
  <div>
    <avatar :img-src="imgSrc"></avatar>
  </div>
</template>
<script>
  export default {
    created () {
      this.imgSrc = require('./assets/default-avatar.png')
    }
  }
</script>

```

通过配置 transformAssetUrls 后，就可以直接配置，这样vue-loader会把对应的属性自动 require 之后传给组件

```js
config.module
  .rule('vue')
  .use('vue-loader')
  .loader('vue-loader')
  .tap(options => {
  // 默认为 true
  // 这意味着编译好的渲染函数会保留所有 HTML 标签之间的空格。如果设置为 false，则标签之间的空格会被忽略。这能够略微提升一点性能但是可能会影响到内联元素的布局。
  options.compilerOptions.preserveWhitespace = true
  // 可以在组件中这样引入图片
  //  <avatar img-src="./assets/default-avatar.png"></avatar>
  // 等价于 require('xxx.png')
  options.transformAssetUrls = {
    avatar: 'img-src'
  }
  return options
}).end()
```

### 压缩图片

>  image-webpack-loader
>
> 将大的图片进行压缩从而缩小打包体积

```js
// vue.config.js
module.exports = {
    chainWebpack: config => {
        // ============压缩图片 start============
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
        // ============压缩图片 end============
    }
}

```

```js
// webpack.base.config.js
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    // 因为用了 url-loader 要先写 file-loader 不然图片出不来
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true, // webpack@1.x
        disable: true, // webpack@2.x and newer
      },
    },
  ],
}]
```

### 配置 webpack 打包依赖库使用 CommonJS

在项目的`babel.config.js`中写下如下的配置就可以了：

```js
module.exports = { 
  ...
  overrides: [ 
    {    
      // 使用的第三方库
      include: './node_modules/module-name/library-name/name.common.js',        			sourceType: 'unambiguous' 
    }  
  ], 
};
```



## Vue 的一些用法

`Vue.config.errorHandler` 捕获声明周期、自定义事件处理函数内部、`v-on DOM` 监听器内部抛出的错误，避免应用崩溃，也可以进行错误上报。

```js
Vue.config.errorHandler = function (err, vm, info) {
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 进行错误上报
}
```

`Vue.config.warnHandler` 为 Vue 的运行时警告赋予一个自定义处理函数,只会在开发者环境下生效

```js
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
```

### 处理 img 加载失败

```vue
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:''
    }
  },
  methods:{
    handleError(e){
      e.target.src=reqiure('图片路径') 
    }
  }
}
</script>

```



## 编译打包失败，内存溢出

**问题描述**：本机打包没问题，服务器打包出错，出错信息为内存溢出，Node内存不足所导致。

 **Node 中通过 JavaScript 使用内存时只能使用部分内存（64位系统下约为1.4 GB，32位系统下约为0.7 GB）**

初步想法：`require.context(xx,true,/js/)`，递归某个层级很深的文件夹导致。因为暂时无法调整 node 编译内存大小。

没办法只能调整 4G了：

```json
"scripts": {
    "build": "node --max_old_space_size=4096 build/build.js",
  },
```

## bus.$event.$on 无效

> https://juejin.im/post/6844903591216414728

**问题描述：**

**从一个页面跳转到另一个页面去选择一些信息，选择好后返回上一个页面，并把选择的信息带过来**

A 组件

```js
 this.$eventBus.$emit('eventName',data)
```

B 组件

```js
 this.$eventBus.$on('eventName',(data)=>data)
```

但是 B 组件没有监听到事件

在路由切换时，执行的方法依次是：

+ 新组件： `beforeCreate`

+ 新组件： `created`
+ 新组件： `beforeMount`
+ 旧组件： `beforeDestroy`
+ 旧组件：` destroyed`
+ 新组件： `mounted`

B 组件需要在 A 组件销毁前。

```js
destroyed () {
	this.$eventBus.$emit('eventName',data)
},
```

## 页面间（ifream）通信 PostMessage

假设有 a、b、c 三个页面，需要进行跨域，跨窗口消息传递

a 页面传递信息给 c

b 可以操作传递给 c 的信息，增删改查

a.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>A-页面</title>
    <style>
        #child {
            display: none;
        }
    </style>
</head>

<body>
    <h2>A-页面</h2>
    <div>
        <label for="">Key</label>
        <input type="text" placeholder="输入key" id="itemKey">
    </div>
    <div>
        <label for="">Value</label>
        <input type="text" placeholder="输入value" id="itemValue">
    </div>
    <div>
        <button id="add">添加</button>
    </div>
    <iframe id="child" src="http://localhost:5500/src/local_cross/c.html"></iframe>
    <script>
        var add = document.getElementById("add");
        add.addEventListener('click', function () {
            var itemKey = document.getElementById("itemKey").value;
            var itemValue = document.getElementById("itemValue").value;
            if (itemKey && itemValue) {
                window.frames[0].postMessage(JSON.stringify({
                    type: "get",
                    key: itemKey,
                    value: itemValue
                }), '*');
                alert('添加成功');
            } else {
                alert('请输入key或者value');
            }
        });
    </script>
</body>

</html>
```

c.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>C-页面</title>
</head>

<body>
    <h2>C-页面</h2>
    <script>
        ;
        (function (win) {
            win.addEventListener("message", function (evt) {
                debugger;
                if (win.parent != evt.source) {
                    return
                }
                var options = JSON.parse(evt.data);
                if (options.type === "get") {
                    var data = win.localStorage.getItem(options.key);
                    win.parent.postMessage(data, "*");
                }
                if (options.type === "set") {
                    win.localStorage.setItem(options.key, options.value);
                }
                if (options.type === "remove") {
                    win.localStorage.removeItem(options.key);
                }
                if (options.type === "clear") {
                    win.localStorage.clear();
                }
            }, false);
        })(window);
    </script>
</body>

</html>
```



b.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>B-页面</title>
    <style>
        #child {
            display: none;
        }
    </style>
</head>

<body>
    <h2>B-页面</h2>
    <div>
        <label for="">Key</label>
        <input type="text" placeholder="输入key" id="itemKey">
    </div>
    <div>
        <button id="getValue">获取</button>
    </div>
    <div id="itemValue"></div>
    <iframe id="child" src="http://localhost:5500/src/local_cross/c.html"></iframe>
    <script type="text/javascript">
        var getValue = document.getElementById("getValue");
        getValue.addEventListener('click', function () {
            var itemKey = document.getElementById("itemKey").value;
            var itemValue = document.getElementById("itemValue");
            if (itemKey) {
                window.frames[0].postMessage(JSON.stringify({
                    type: "get",
                    key: itemKey
                }), '*');
                window.addEventListener('message', function (e) {
                    if (e.origin && e.origin === 'http://localhost:5500') {
                        var data = e.data;
                        itemValue.innerHTML = 'value为' + data;
                    }
                }, false);
            } else {
                alert('请输入key');
            }
        });
    </script>
</body>

</html>
```

