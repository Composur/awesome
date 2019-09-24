### mixin
#### 1.把一个对象的属性拷贝到另一个对象身上
```
var mixin=function(a,b){
  for(let key in b){
    a[key]=b[key] //b的属性拷贝到a身上，es6可以用Object.assign(a,b)
  }
}
```
### 柯里化

```
var fn=function(x,y){
  return x+2*y
}
var g=function(y){
  return function(x){
    return x+2y
  } //偏函数
}
console.log(g(3)(1))
```
 

### 高阶函数

+ 接受一个或多个函数作为输入
+ 输出一个函数