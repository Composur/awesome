---
sidebar: auto
---
## React  Hooks 速学

> Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的 JavaScript 函数。不编写 class 的情况下使用 state 以及其他的 React 特性。
>
> **React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。**当你想使用外部功能和副作用的时候，就用钩子函数把外部代码钩进来

#### 出现的原因

+ 代码管理困难，每个组件的状态，修改状态改动的文件较多。Hooks 可以把组件相互关联的部分拆分成函数。使其无需按照生命周期划分。
+ class 带来的问题，this 绑定、不能很好的压缩、热重载不稳定等问题。

react 提供了下列四个最常用的钩子函数（）

```js
- useState()
- useContext()
- useReducer()
- useEffect()
```

#### 注意事项

+ 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用
+ 只能在 **React 的函数组件**中调用 Hook，**不要在普通的 JavaScript 函数中调用 Hook**
+ [借助插件来强制执行以上规则](https://www.npmjs.com/package/eslint-plugin-react-hooks)

#### class 与 hooks 的区别

+ **Hook 允许我们按照代码的用途分离他们，** 而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用组件中的*每一个* effect。

#### 新增的 Hook

##### 1. useState 

返回一个 state，以及更新 state 的函数。

```js
//setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列
const [state, setState] = useState(initialState);
```

例子：

```jsx
import React ,{useState} from 'react'

function Example() {
  // useState 的唯一参数就是 state 0
  // 声明一个新的叫做 “count” 的 state 变量 ，和一个 操作 count 的函数 setCount
  // 当函数退出的时候，state 会保存在 React 中，其它变量会被回收。
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> 
        Click me
      </button>
    </div>
  );
}

export default Example
```

我们可以在单个组件中使用多个 State Hook 或 Effect Hook，怎么确定哪个 state 对应 useState ？

答案是：React 靠的是 Hook 调用的顺序，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作。

##### 2. Effect

> 用来执行副作用的操作，它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，在第一次渲染和每次更新后都会执行。

```js
// 相当于 componentDidMount 和 componentDidUpdate: title 会及时更新。
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  },[count]); // 第二个可选参数 仅在 count 更改时更新
```

执行结束需要清除副作用 的话，需要返回一个函数，在函数内部清除。

useEffect() 的用途

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

#### 自定义Hook

> 通过自定义 Hook，可以将组件逻辑提取到可重用的函数中

+ 自定义的 Hook 是一个函数，以 use 开头，useXXX。**函数内部可以调用其他的 Hook**

+ 用法和其它 Hook 一样，就像函数一样去传参、使用就可以。