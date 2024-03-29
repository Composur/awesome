# 基本概念

## 类型

+ Ts 的类型 = JS 的类型 + `void` +` enum` +`never` + `unknown`+`any` + `type`+ `interface`
  + type 和 interface 属于自定义类型
+ js 中的数据类型是具体的某个值的类型，ts 中的类型指的是集合。

### 如何描述 Object 类型

因为 object 很不精确所以一般用下面的方式描述 object 类型

+ 用 class 或 constructor
+ 用 type 或 interface

```ts
// 索引签名的模式
type A = { [k: string]: number }

// Record 泛型模式
// 二者等价
type A2 = Record<string, number>
```

### 函数对象

由于 `Function` 太不精确了，它涵盖的场景比较多例如下面的写法：

```ts
const fn: Function = () => { return 'xxx' }
```

上面的写法基本没啥用，类型没有做限制。

所以 TS 开发一般使用 `()=>{}` 来描述函数。

```ts
const foo: () => {} = () => { return 'xxx' }
```



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

> 在 JavaScript 中，如果你调用一个函数的时候，传入了比需要更多的参数，额外的参数就会被忽略。TypeScript 也是同样的做法。不用去设置可选参数。

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

用来描述两个值之间的对应关系，用一个相同类型来关联两个或者更多的值。



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

### type vs interface

+ interface 描述**数据结构**，用 type 描述**类型关系**。
+ type 还可以定义字符串字面量类型，`type x = 'a' | 'b' | 'c'` 那么使用该类型只能从这三个值中取，不在的就会报错。
+ 另外使用 type 比较多的地方就是联合类型，如函数返回类型是 `type x = string | object | void`，就不用一次次的写，复用性高。
+ type 无法添加新的属性，interface 可以

### 字面量推断

下面的写法会报异常。req.method` 被推断为 `string` ，而不是 `"GET"

```tsx
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// 报下面异常
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

解决方案一：

```tsx
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

解决方案二：使用 `as const` 把整个对象转为一个类型字面量：

```tsx
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

`as const` 效果跟 `const` 类似，但是对类型系统而言，它可以确保所有的属性都被赋予一个字面量类型，而不是一个更通用的类型比如 `string` 或者 `number` 。

### ! 非空断言操作符

`!` 表示这是一个有效的类型断言，表示它的值不可能是 `null` 或者 `undefined`

```tsx
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

就像其他的类型断言，这也不会更改任何运行时的行为。重要的事情说一遍，只有当你明确的知道这个值不可能是 `null` 或者 `undefined` 时才使用 `!` 。

### keyof 

**限制属性名的范围**

```typescript
function prop(obj: object, key: string) {
  return obj[key];
}
```

元素隐式地拥有 any 类型，因为 string 类型不能被用于索引 {} 类型。要解决这个问题，你可以使用以下非常暴力的方案：

```typescript
function prop(obj: object, key: string) {
  return (obj as any)[key];
}
```

该函数用于获取某个对象中指定属性的属性值。因此我们期望用户输入的属性是对象上已存在的属性，使用泛型和泛型约束，使用 keyof 获取 T 类型的所有键

```typescript
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```



### unknown

> `unknown` 类型可以表示任何值。有点类似于 `any`，但是更安全，因为对 `unknown` 类型的值做任何事情都是不合法的：

你可以描述一个函数可以接受传入任何值，但是在函数体内又不用到 `any` 类型的值

```typescript
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
  // Object is of type 'unknown'.
}
```

### typeof

类型操作符

搭配 `ReturnType<T>` ,传入一个函数类型，`ReturnType<T>`会返回该函数类型的返回值。

```typescript
type Predicate = (x:unknown)=>boolean

# k 的类型就是 boolean
type K = ReturnType<typeof Predicate>            
```

### 条件类型

**用于描述输入类型和输出类型之间的关系**，写法类似 `js` 的三元运算符。

```typescript
SomeType extends OtherType ? TrueType : FalseType ;
```

### 类

#### 实现接口

```typescript
interface Checkable {
  check(name:string)=>boolean
}

class NameChecker implements Checkable {
  // s 的类型是 any
  check(s) {
    
  }
}
```

**注意：implements 语句不会影响类内部是如何检查或者类型推断**，`s` 的类型会是 `any`

#### 类初始化的顺序

+ 基类字段初始化 （继承的那个类）
+ 基类构造函数运行
+ 派生类字段初始化 （自身）
+ 派生类构造函数运行

# React 实践

> Hook 是能让我们在函数组件中钩入 React 特性的函数,通常以 use 开头

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



## 开始

### Button 

1. button 有系列属性例如 size 有 large small normal。type 有 primary danger waring 等，我们先定义类型。

   ```tsx
   export type ButtonSize = 'lg' | 'sm'
   export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
   ```

   

2. 定义 props 

   ```tsx
   interface BaseButtonProps {
     className?: string,
     disabled?: Boolean,
     size?: ButtonSize,
     btnType?: ButtonType,
     href?: string,
     children: React.ReactNode
   }
   ```

   

3. 创建函数组件

   ```tsx
   const Button: React.FC<ButtonProps> = (props) => {
     const {
       className,
       children,
       size,
       btnType,
       href,
       disabled,
       // 其他 props
       ...resetProps
     } = props
   
     // 整合类名
     const btnClass = classNames('btn', className, {
       [`btn-${btnType}`]: btnType,
       [`btn-${size}`]: size,
       disabled: (btnType === 'link' && href)
     })
   
     // 如果是 a 链接
     if (btnType === 'link' && href) {
       return (
         <a href={href} {...resetProps}>{children}</a>
       )
     }
     return (
       <button
         className={btnClass}
         disabled={disabled}
         {...resetProps}>
         {children}
       </button>
     )
   }
   
   Button.defaultProps = {
     disabled: false,
     btnType: 'default'
   }
   ```

   注意关于 `Button` 组件的联合类型

   ```tsx
   // & 表示叠加（联合）类型
   type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
   // a 链接
   type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
   // 设置属性为可选
   // 例如： a 必须有的属性 button 不一定必须
   export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
   ```

   

### Menu

如何设计一个 menu 组件？

高亮？ 垂直显示？ 点击回调？禁用？添加自定义类？

添加点击事件



父组件传递数据给子组件 `createContext`

```tsx

// context 类型
interface MenuContextProps {
  index?: number,
  onSelect?: onSelectCb
}
// 定义 context
export const MenuContext = createContext<MenuContextProps>({ index: 0 })

// 父组件
...
  const contextValue = {
    index:0
  }
	return (
    <MenuContext.Provider value={contextValue}>
      <ul className={classes} style={style}>
        {children}
      </ul>
    </MenuContext.Provider>
  )

...

```

**注意：**

上面的 children 我们需要限制一下类型只能是 `MenuItem` 组件

设置一下 menuItem 的 displayName 

```tsx
SunMenu.displayName = 'MenuItem'
export default SunMenu
```

然后在父组件渲染的时候进行判断

```tsx
 const MenuItemRender = () => {
    return React.Children.map(children, (child, idx) => {
      // 为了获取 type 这里需要把 child 断言成 FunctionComponentElement 实例
      const childEle = child as FunctionComponentElement<MenuItemProps>
      if (['MenuItem', 'SubMenuItem'].includes(childEle.type.displayName as string)) {
        return React.cloneElement(childEle, { index: idx });
      } else {
        console.error('无法接受非 MenuItem', 'SubMenuItem 以外的组件')
      }
    })
  }
```

**子组件`useContext`根据传递过来的 index 进行高亮和 onSelect 进行回调**

```tsx
// 父组件导入的 context 得到 {index:0}
const MenuProps = useContext(MenuContext)
```

**`submenu` 子组件也是 `menuItem` 进行 `submenu` 组件的编写**

添加子组件显示隐藏的逻辑

```tsx
const clickHandle = () => {
    if (MenuProps.onSelect && typeof index === 'number') {
      MenuProps.onSelect(index);
      setMenuOpen(!menuOpen);
    }
  }
```

*这个时候有个问题，点击其它菜单的时候已展开的子菜单并没有隐藏*

**如何在 `menuItem` 中通知 `subMenu` 进行子菜单的显示隐藏？**

可以设置 hover 的显示隐藏，鼠标离开子菜单 `display：none`

```tsx
  // 展开加个延时放置卡顿
  let timer: any;
  const mouseHander = (e: MouseEvent, open: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(open)
    }, 300);
  }
  // hover 展开
  const hoverHander = {
    onMouseEnter: (e: MouseEvent) => mouseHander(e, true),
    onMouseLeave: (e: MouseEvent) => mouseHander(e, false)
  }
```

**子菜单通过配置展开**

1. 通过 Meun 的 props 设置，通过 MenuContext 进行传递。
2. 通过自身 props 设置。

### ICON

#### react-fontawesome

1. 安装

   ```sh
   yarn add @fortawesome/fontawesome-svg-core
   yarn add @fortawesome/free-solid-svg-icons
   yarn add @fortawesome/react-fontawesome
   ```

2. 使用

   ```tsx
   const Icon: FC = () => {
     return (
       <>
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} spin />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} pulse />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} border />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} pull="left" />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'blue', fontSize: '50px' }} flip="horizontal" />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} flip="vertical" />
         <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'red', fontSize: '50px' }} flip="both" />
         <FontAwesomeIcon icon={faCoffee} size={'6x'} />
         <FontAwesomeIcon icon={faCoffee} pull="left" />
         <FontAwesomeIcon icon={faCoffee} pull="right" />
       </>
     )
   }
   ```

3. 封装

   1. 添加主题，像button一样有 theme type

4. 给 submenu 添加 icon

   1. 添加 icon  设置样式，动画等。

   ```scss
    .arrow-icon {
         transition: transform .25s ease-in-out;
         margin-left: 3px;
       }
     &:hover {
         .arrow-icon {
           transform: rotate(180deg);
        }
     }
   ```

   2. RTG：`React Transition Group` 缩写

      1. 原理是基于 CSS transition 属性的补间动画（开始、结束两个状态）

         通常用于初始化（进场）渲染、组件添加、删除、转场（比如单页路由切换）
      
   3. 添加 wrapper 属性，避免 transition 属性发生冲突，Transition 组件本身的和他的子组件自带的冲突，transition 是无法继承的。
   
      1. 其实就是添加一个空节点套一下，把 Transition 作用给外层元素。
   
      ```
      ```
   
      
