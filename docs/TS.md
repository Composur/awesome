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

**多个参数**

