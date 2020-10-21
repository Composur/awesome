## Module 的语法

### 概述

> 写在前面，计算机语言的发展，机器语言--汇编语言--低级语言（面向过程）--高级语言（面向对象）--系统化模块--框架--API

#### es6 之前

​	**没有模块化的时候出现的问题**

+ 脚本变多时，需要手动管理
+ 不同逻辑脚本间的调用需要用到全局变量。
+ 没有HTML就没法运行了，没地方写script标签
+ 没有模块(在HTML中借助`script`标签执行`JavaScript`)--CMD（同步）--AMD（异步）--es6

>`AMD`规范:全称”Asynchronous Module Definition”，称为 异步模块加载规范 。一般应用在浏览器端。流行的浏览器端异步加载库`RequireJS`实现的就是`AMD`规范。
>
>`CommonJS`: 称为同步模块加载规范，也就是说，只有加载完成，才能执行后面的操作。用于服务器端。

+ `CommonJS` 模块就是对象，输入时必须查找对象属性。代码运行时加载，输出的值是值得拷贝。

+ 依赖前置，提前执行!

  ```js
  // 只有先全部加载 fs 这个方法才能在这个对象上读取这个三个方法
  let { stat, exists, readFile } = require('fs'); 
  ```

#### es6 中的 module（需要进行编译，在浏览器不能够直接运行）

> ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。输入的是值的引用。

+ 这种加载称为“编译时加载”或者静态加载，效率更高

```js
// ES6模块 从`fs`模块加载3个方法不用全部加载
import { stat, exists, readFile } from 'fs';  //
```

#### export

>每个module都是一个独立的文件，该文件类的所有内容外部都无法获取,export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

1. 写法

    ```
    export const name='haha'

    //也可以
    name='haha'
    sex='male'
    export {name,sex} //可以接受多个属性

    //输出变量和类

    export function fn(){}

    ```

2. export 输出的变量是有名字的，可以使用as替换

    ```
    function fn1(){}

    export {fn1 as fn2}

    ```

3. 默认成员

    export default 

#### import

`import 'fs'` 这样会加载所有

```
import {xx,xxx} form 'xxxxx'
```
`import` 导入的时候需要知道要导入的方法名称

如果使用了 `export default` 的默认输出，我们 `import` 的时候可以用任意的名字

```
export.js

export default function fn(){} //一个模块只能有一个默认输出，还是可以通过export 正常导出其它函数，import {xx}通过指定名称正常导入


import.js 

import foo from 'export.js' //import时候不能使用大括号

```


#### Node 中 CommonJS 规范

> CommonJS 是一个很大的规范 Node 和浏览器只是借用了它的一部分精华

*先来Node环境运行的结果：*

```
# a.js

console.log('我是a.js')

```

*无引用的情况：*

```
# b.js

const lib = require('./a')
console.log('我是b.js')

# 运行b.js

我是a.js
我是b.js
```
*有引用的情况：*

```
# b.js

const lib = require('./a')
console.log('我是b.js',lib)

# 运行b.js

我是a.js
我是b.js {} //得到一个空对象

```
*有 `exports` 情况，通过 exports 定义模块的输出：*

```
# a.js

exports.hello='world!' // 这里可以挂载合法的数据类型，对象、字符串、函数等
console.log('我是a.js')

```


```
# b.js

const lib = require('./a')
console.log('我是b.js',lib)

# 运行b.js

我是a.js
我是b.js { hello: 'world!' } //得到一个含有 key 的对象 `key` 就是挂载到 `exports` 上的属性名

```

*b.js require 的引用和 a.js exports 的引用是不是同一个引用？*

```
# a.js

exports.hello='world!'
console.log('我是a.js')
setTimeout(()=>{
  console.log(exports)
},1000)

```


```
# b.js

const lib = require('./a')
console.log('我是b.js',lib)
lib.addNewProperty = '我是b.js中新增加的属性'

# 运行b.js

我是a.js
我是b.js { hello: 'world!' }

# 一秒后输出 说明  exports 导出的引用和 require 得到的引用是同一个引用
{ hello: 'world!', addNewProperty: '我是b.js中新增加的属性' } 

```


*如果直接导出一个函数该怎么办？ exports.function?*

```
a.js

exports.hello='world!'

console.log('我是a.js')

module.exports = function test(){
  console.log('我是a.js导出的function')
}
```

```
b.js

const lib = require('./a')
console.log('我是b.js',lib)
lib.addNewProperty = '我是b.js中新增加的属性'
console.log(lib.hello)
console.log(lib)

# 运行b.js

我是a.js
我是b.js function test(){
  console.log('我是a.js导出的function')
}
undefined // 拿不到 exports 的引用 

// addNewProperty 挂载到了 module.exports 上
{ [Function: test] addNewProperty: '我是b.js中新增加的属性' } // module.exports 会覆盖 exports 的内容 

```

>`Node 中 ES6 模块和 CommonJS 采用各自的加载方案。`

`CommonJS` 模块的输出都定义在 `module.exports` 这个属性上面。`Node` 的 `import` 命令加载 `CommonJS` 模块，`Node` 会自动将`module.exports` 属性当作模块的默认输出，即等同于 `export default xxx`

前端可以借助 `Webpack` 利用 `CommonJS` 的规范书写代码，`Webpack` 会把所有的 `CommonJS` 分析一遍然后生成一个大的 `js`,所有的文件成为一个对象{`./index.js:(function(modeule,exports,__webpack_require__){文件内容}}),./xxx.js:(function(modeule,exports){文件内容}})` 通过这种形式为每个文件创建了一个作用域。

+ CommonJS
    ```
    // a.js
    module.exports = {
        foo: 'hello',
        bar: 'world'
    };

    // 等同于
    export default {
        foo: 'hello',
        bar: 'world'
    };
    ```

### 总结

+ 改变 `require` 的对象原对象也会受影响（值引用）
+ `exports` 的 `require` 的 `js` 默认的是一个空对象，对象里面可以有函数
+ `exports` 通过 `exports.xx` 导出对象，所有的导出都挂载`exports`这个对象上，`require`输入默认的是一个空对象，通过这种方式定义一个对象的输出
+ `modules.exports`可以直接导出一个函数
+ `exports`和 `module.exports`同时存在时只会导出 `module.exports`的内容，会覆盖`exports`
+ `import` 输出的是值得引用（复制一份地址） 

