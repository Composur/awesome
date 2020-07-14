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


