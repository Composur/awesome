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
