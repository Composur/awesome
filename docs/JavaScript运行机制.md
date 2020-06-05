# JS 运行机制

## JavaScript 代码的执行流程

我们都知道`JavaScript` 代码执行的时候 “变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面。但，这并不准确。**实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中**。

一段` JavaScript` 代码在执行之前需要被 `JavaScript` 引擎编译，编译完成之后，才会进入执行阶段。

![js_run](./img/js_run.jpg)

我们看一段代码：

```js
showName()
console.log(myname)
var myname = 'foo'
function showName() {
    console.log('函数showName被执行');
}
```

执行流程细化一下：

第一部分：变量提升

```js
//JavaScript 引擎将在环境对象中创建一个名为 myname 的属性，并使用 undefined 对其初始化
var myname = undefined 

// JavaScript 引擎发现了一个通过 function 定义的函数，所以它将函数定义存储到堆 (HEAP）中
// 并在环境对象中创建一个 showName 的属性，然后将该属性值指向堆中函数的位置
function showName() {
    console.log('函数showName被执行');
}
// 如果存在相同的变量或函数名，后一个会覆盖前一个，那么最终生效的是最后一个函数。
```

第二部分：执行的代码

```js
// 执行到 showName 函数时，JavaScript 引擎便开始在变量环境对象中查找该函数
showName()
console.log(myname) // JavaScript 引擎继续在变量环境对象中查找该对象
myname = 'foo' // 对 myname 进行赋值

// 执行的时候
VariableEnvironment:
     myname -> undefined, 
     showName ->function : {console.log(myname)
```



从上面的代码我们可以得出，经过编译后，会生成两部分内容：**执行上下文（Execution context）和可执行代码。**

**执行上下文是 JavaScript 执行一段代码时的运行环境**，比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。



