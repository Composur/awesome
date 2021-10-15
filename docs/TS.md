# 基本概念

### **interface**（接口）

+ 对对象的形状进行描述
+ 对类进行抽象
+ 是一种规范、一种规则

例如我们要创建一个 `Person` 对象，需要对 `Person` 的属性进行一定的约束。

```tsx
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

### 函数类型

一个函数有输入和输出，需要把输入和输出都考虑到。

函数声明

```tsx
function sum(x: number, y: number): number {
    return x + y;
}
```

表达式

```js
let mySum: (x: number, y: number) =>
number = function (x: number, y: number): number {
    return x + y;
};
```

**在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。**

### 泛型

是指我们在定义函数、接口、类的时候不预先指定类型，而是在使用的时候在指定类型。

**例一：不指定类型**

```typescript
function foo(arg) {
   return arg
}
// 这个时候 res 的类型是 any 而非 number
const res = foo(123)
console.log(res)
```

**例一：加入泛型**

```typescript
// 参数和返回值都定义为 T
function foo<T>(arg: T): T {
  return arg
}
// 这个时候 res 的类型是 number
// ts 可以根据类型推断出来
const res = foo(123)
console.log(res)
```

**例子三：约束类型**

```typescript
interface Length {
  length:number
}
function foo<T extends Length>(arg: T): T {
  return arg.length
}
```



**例子四：联合类型&类型断言**

```typescript
type res = fn => fn()
interface Cat {
  run():void
}
interface Dog {
  swim():void
}
function foo(arg: Cat | Dog){
  if(typeof (arg as Dog).swim === 'function'){
    return res();
  }
}
```

**例子五：类型别名**

```typescript
type res1 = string
type res2 = () => string

function foo(arg: res1 |res2){
  if(typeof arg === 'string'){
    return arg
  }
  return arg()
}
```



# React 实践

> Hook 是能让我们在函数组件中钩入React特性的函数,通常以 use 开头

## 准备工作

### 环境搭建

```bash
npx create-react-app react-component --typescript
```

### 基础 Hooks 

**useState**

> 每一次渲染的 state 和 porps 值都是独立的

*例子一：useState 是替换而不是像 setState 那样合并 state*

```tsx
import React, {useState } from 'react';

const TestUseState:React.FC  = ()=> {
  // 初始 0 只会在首次渲染时用到
  const [count, setCount] = useState(0)
  console.log('before render')
  return (
    <>
      <div>{count}</div>
      <button onClick={()=>setCount(count+1)}>+</button>
    </>
  )
}
export default TestUseState;
```

*例子二：state 的值是独立的，事件触发的时候会捕捉当前事件发生时候的状态，从而形成一个闭包*

例如：异步

```tsx
useEffect(()=>{
  // 只会 alert 的初始 count 2s内count发生变化 2s后alert的值不会更新
  setTimeout(() => {
    alert(count)
   }, 2000);
},[])
```



**自定义 hook**

*例子二：可以用 useState 把多个 state 拆开，后期可以把相关的逻辑提取到一个自定义 hook*

+ 必须以 `use`开头
+ 不共享 `state` 彼此隔离

```tsx
import{useState,useEffect } from 'react';

const useMouseMove = ()=>{
  const [position, setPosition] = useState({x:0,y:0})
  useEffect(()=>{
    console.log('addEventListener: in useEffect cb')
    const clickCb = (e:TouchEvent)=>{
      setPosition({x:e.touches[0].pageX,y:e.touches[0].pageY})
    }
    document.addEventListener('touchmove',clickCb)
    return ()=>{
      document.removeEventListener('touchmove',clickCb)
    }
  },[])
  return position
}

export default useMouseMove;

// 在别的地方引用
const movePos = useMouseMove()
```



**useEffect**

> 给组件添加渲染后的副作用，每次数据变更后传入的callback都会执行(含首次)。等于说组件内的 state 或 props 发生改变它都会执行。

+ 无需清除的副作用(执行完下列操作就可以忽略她们了)

  + Dom 更新后发起网络请求

  + 组件加载更新后变更 Dom

    ```tsx
    import React, {useState,useEffect } from 'react';
    
    const TestUseState:React.FC  = ()=> {
      const [count, setCount] = useState(0)
      useEffect(()=>{
        console.log('in useEffect cb')
        document.title = `${count}` 
      })
      console.log('before render')
      return (
        <>
          <div>{count}</div>
          <button onClick={()=>setCount(count+1)}>+</button>
        </>
      )
    }
    export default TestUseState;
    ```

    

  + 记录日志

+ 需要清除的副作用

  + 添加DOM事件

    ```tsx
    import React, {useState,useEffect } from 'react';
    
    const TestUseState:React.FC  = ()=> {
      const [count, setCount] = useState(0)
      const [num, setnum] = useState(0)
      const [position, setPosition] = useState({x:0,y:0})
    
      // 点击的时候没有影响 count 但是它也执行
      useEffect(()=>{
        console.log('status: in useEffect cb')
        document.title = `${count}` 
      })
      
      // 这样写有很大的问题，会导致事件监听一直累加不会清掉
      useEffect(()=>{
        console.log('event: in useEffect cb')
        const clickCb = (e:MouseEvent)=>{
          setPosition({x:e.clientX,y:e.clientY})
        }
        document.addEventListener('click',clickCb)
        document.title = `${count}` 
      })
    
    
      console.log('before render')
      return (
        <>
          <div>{count}</div>
          <button onClick={()=>setCount(count+1)}>count+</button>
          <div>{num}</div>
          <button onClick={()=>setnum(num+1)}>num+</button>
          <div>{`x:${position.x}||y:${position.y}`}</div>
        </>
      )
    }
    export default TestUseState;
    ```

  + React 会在组件卸载的时候执行清除操作，执行 useEffect 回调函数的返回函数。会在执行下一个 effect 之前对上一个进行清除。

    ```tsx
    useEffect(()=>{
      console.log('event: in useEffect cb')
      const clickCb = (e:MouseEvent)=>{
        setPosition({x:e.clientX,y:e.clientY})
      }
      document.addEventListener('click',clickCb)
      document.title = `${count}` 
      return ()=>{
        document.removeEventListener('click',clickCb)
      }
    })
    ```

    

  + 控制 useEffect 的调用次数

    + 两次渲染若数据没有发生变化，跳过此次执行

      + 第二个参数传递空数据，即通知 useEffect 不依赖任何 props 和 state

        ```tsx
        useEffect(()=>{
          console.log('addEventListener: in useEffect cb')
          const clickCb = (e:MouseEvent)=>{
            setPosition({x:e.clientX,y:e.clientY})
          }
          document.addEventListener('click',clickCb)
          return ()=>{
            document.removeEventListener('click',clickCb)
          }
        },[])
        ```

  + 订阅外部数据源

**useRef**

> 返回的 ref 对象在组件的整个生命周期中持续存在

+ 接上面 useState 例子二

  ```tsx
  const useref = useRef(0)
  useEffect(()=>{
    setTimeout(() => {
    	alert(useref.current)
    }, 2000);
  },[])
  ​```
  useref.current++
  ```

  

+ 获取 dom 实例

  ```tsx
  const useref = useRef<HTMLInputElement>(null) 
  useEffect(()=>{
     console.log(useref.current?.focus())
   },[])
  ...
  <input type="text" ref = {useref}/>
  ```



## 工程搭建

### 文件目录划分



### 色彩体系搭建

+ 系统色板

  + 定义组件库的基础色系

    ```scss
    // 系统色
    $primary:       $blue !default;
    $secondary:     $gray-600 !default;
    $success:       $green !default;
    $info:          $cyan !default;
    $warning:       $yellow !default;
    $danger:        $red !default;
    $light:         $gray-100 !default;
    $dark:          $gray-800 !default;
    ```

    `!default` 意思是别人用相同的命名，这个就不进行赋值了。

  + 字体系统

    ```scss
    // 无衬线字体
    $font-family-sans-serif:      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
    // 等宽字体
    $font-family-monospace:       SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;
    $font-family-base:            $font-family-sans-serif !default;
    
    ```

    

  + 表单

  + 按钮

  + 边框阴影

  + 可配置开关