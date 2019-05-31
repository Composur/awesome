/**
 * 1. 请写一个函数 fn，其参数是一个函数 fn2，其返回值是一个函数 fn3，fn3 会调用 fn2。
 * 2. 请写一个函数满足 add(1, 2, 3, ...) 得到所有参数的和，参数个数不确定。
 * 3. 请写一个函数满足 add2(1)(2)(3)(.........)() 在遇到没有参数的调用时，返回所有参数的和。
 * 4. 请再写一次 add2，要求其内部使用了 add 函数，且只在最后求和时使用了 add。
 */

const {log}=console

function fn2(){log('我是fn2')}

function fn(callback) {
   return function fn3(){
        callback()
    }
}
const result=fn(fn2)
result()


function add(...arr) {
  let result=0
  for(let i=0;i<[...arr].length;i++){
      result+=[...arr][i]
  }
  log(result)
}
log(add(1,3,5,55,46))

// function add2() {}
// add2.result = 0;

// function add3() {}

// console.assert(add(1, 2, 3, 4, 5) === 15, "add");
// console.assert(add2(1)(2)(3)(4)(5)() === 15, "add2");
// console.assert(add3(1)(2)(3)(4)(5)() === 15, "add3");
