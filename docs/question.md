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

