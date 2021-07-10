# commonJS

**特点**

+ 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
+ 模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——同步加载。

**运行环境**

+ NodeJS 服务器环境

**导入导出规范**

+ 导入 `require(path)`
+ 导出 `module.exports` 和 `exports`

**module.exports 和 exports 的的区别是 exports 只是对 module.exports 的一个引用，相当于Node 为每个模块提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一行`const exports = module.exports;`这样的命令。**

```js
// a.js
// 相当于这里还有一行：const exports = module.exports;

// 相当于：module.exports.a = 'Hello world';
exports.a = 'Hello world';  

// b.js
const moduleA = require('./a.js');
console.log(moduleA.a);     // 打印出hello world
```

# AMD

**特点**

+ 异步加载
+ 管理模块之间的依赖性，便于代码的编写和维护。

**应用环境**

+ 浏览器环境 （ requireJS 是参照AMD规范实现的）

**导入导出**

+ 导入 `require(['模块名称'], function ('模块变量引用'){// 代码});`

+ 导出 `define(function (){return '值'});`

```js
// a.js
define(function (){
　　return {
　　　a:'hello world'
　　}
});

// b.js
require(['./a.js'], function (moduleA){
    console.log(moduleA.a); // 打印出：hello world
});
```

# CMD

**特点**

CMD是在AMD基础上改进的一种规范，和AMD不同在于对依赖模块的执行时机处理不同，CMD是就近依赖，而AMD是前置依赖。

**应用环境**

+ 浏览器环境 （ seajs 是参照UMD规范实现的）

**导入导出**

+ 导入 `define(function(require, exports, module) {});`

+ 导出 `define(function (){return '值'});`

```js
// a.js
define(function (require, exports, module){
　　exports.a = 'hello world';
});
// b.js
define(function (require, exports, module){
    var moduleA = require('./a.js');
    console.log(moduleA.a); // 打印出：hello world
});
```

# UMD

**特点**

+ 兼容AMD和commonJS规范的同时，还兼容全局引用的方式

- 环境：浏览器或服务器环境
- 应用：无
- 语法
  - 无导入导出规范，只有如下的一个常规写法：

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        //浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //方法
    function myFunc(){};
    //暴露公共方法
    return myFunc;
}));
```

# ES6 module

**特点**

+ 按需加载（编译时加载）
+ `import` 和` export` 命令只能在模块的顶层，不能在代码块之中（如：`if` 语句中）, `import()` 语句可以在代码块中实现异步动态按需动态加载

**应用环境**

+ 浏览器环境 （ ES6 ）

**导入导出**

+ 导入 `import {模块名A，模块名B...} from '模块路径'`
+  `import('模块路径').then()方法`

+ 导出 `export和export default`

**注意：**`export` 只支持对象形式导出，不支持值的导出，`export default` 命令用于指定模块的默认输出，只支持值导出，但是只能指定一个，本质上它就是输出一个叫做 `default` 的变量或方法。

```js
/*错误的写法*/
// 写法一
export 1;

// 写法二
var m = 1;
export m;

// 写法三
if (x === 2) {
  import MyModual from './myModual';
}

/*正确的三种写法*/
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// 写法四
var n = 1;
export default n;

// 写法五
if (true) {
    import('./myModule.js')
    .then(({export1, export2}) => {
      // ...·
    });
}

// 写法六
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```



****

### webpack 模块化的原理

+ 所有的模块最终都会转成 CommonJS
+ babel 能提前将 es6 的 import 等模块关键字转换成 commonjs 的规范。这样 webpack 就无需再做处理，直接使用 webpack 运行时定义的 __webpack_require__ 处理
### 按需加载原理
```
import { Button, Select } from 'element-ui'
```
经过 babel 的转换
```
var a = require('element-ui');
var Button = a.Button;
var Select = a.Select;
```
所以这样会加载所有组件

#### babel-plugin-component 的原理

```
import { Button, Select } from 'element-ui'
```
经过 babel-plugin-component 的转换 再结合 babel 就是按需加载了

```
import Button from 'element-ui/lib/button'
import Select from 'element-ui/lib/select'
```
