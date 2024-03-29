// 算法题：
// f1为纯函数，没有任何异步逻辑
// const f2 = cache(f1);
// f2('abc', 123, { b: 3 });    // 5， 耗时100s
// f2('abc', 123, { b: 3 });    // 5， 耗时0s

/**
* 发布订阅模式
* 餐馆订餐，可以定不同的餐 A, B ,C
* 完成之后，通知用户取餐
* 要求：
* 1.先到先得
* 2.可以一次完成一份餐，也可以一次完成多份相同餐
*/
class CustomEvent {
  constructor() {
    this.clientList = []
  }

  // 订阅通知
  addListener(type, fn) {
    if (!this.clientList[type]) {
      this.clientList[type] = []
    }
    this.clientList[type].push(fn)
  }

  // 取消订阅
  removeListener(type) {
    if (!type) {
      this.clientList = {}
    }
    this.clientList[type] = []
  }
  // 发送通知
  trigger(types, ...args) {
    types.forEach(type => {
      const fns = this.clientList[type]
      if (!fns || fns.length < 0) {
        return
      }
      const fn = fns.shift()
      fn.apply(this, args)
    })
  }
}

// 调用
const Event = new CustomEvent()
Event.addListener('A', () => {
  console.log('我订到了一份A餐')
})
Event.addListener('A', () => {
  console.log('我订到了一份A餐')
})
Event.addListener('S', () => {
  console.log('我订到了一份S 餐')
})

Event.trigger(['A', 'A', 'S'])

/**
 * 实现sumFn(1)(2) == 3
 */


function sumFn(...rest) {

  // 参数传递的角度
  const fn = (...args) => {

    return sumFn(...rest.concat(args));
  }

  fn.valueOf = () => rest.reduce((a, b) => a + b);

  return fn;
}

console.log(sumFn(1)(2).valueOf());
console.log(sumFn(1)(2)(3).valueOf());

/**
 * 实现new Fun('name').eat('food1').sleep(1000).eat('food2').sleepFirst(3000).sleepFirst(1000)
 * sleepFirst最先执行，延迟对应的时间。其余的依次执行
 */


// 
// 

// 二叉树的广度优先遍历

// 二叉树的深度优先遍历（前中后序）

// 最长不重复子串

// 实现 JS 函数式编程中的 compose 函数（可接收多个 function 用于组合，执行顺序从右到左，前函数的执行结果作为后函数的入参）

/* 实现，一个dot函数，将嵌套的对象结构转为非嵌套的对象 */
/* 例如 */
const obj = {
  id: 'abc',
  nes: { ted: { value: true } },
  other: { nested: { stuff: 5 } },
  some: { array: ['A', 'B'] }
};
/* 输出
 {
   "id": "abc",
   "nes.ted.value": true,
   "other.nested.stuff": 5,
   "some.array[0]": "A",
   "some.array[1]": "B"
 }
*/

// 深拷贝

// 大数相加 、大数相乘

// 实现一个 flat 方法，可以根据传入的层级展开对应深度的数组嵌套：
// 例子：
// var arr1 = [1, 2, [3, 4], [5, 6]];
// arr1.flat();
// [1, 2, 3, 4, 5, 6]
// var arr2 = [1, 2, [3, 4, [5, 6]], [7, 8]];
// arr2.flat();
// [1, 2, 3, 4, [5, 6], 7, 8]
// var arr3 = [1, 2, [3, 4, [5, 6]]];
// arr3.flat(2);
// [1, 2, 3, 4, 5, 6]
// 使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
// arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const flat = (arr, size) => {
  if (size > 0) {
    return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, size - 1) : cur), [])
  } else {
    return arr.slice()
  }
}
console.log(flat(arr4, 1))

// 加起来和为目标值的组合
// 给出一组候选数C和一个目标数T，找出候选数中起来和等于T的所有组合。
// C中的每个数字在一个组合中只能使用一次。
// 注意：
// 题目中所有的数字（包括目标数 T ）都是正整数
// 组合中的数字 (a_1, a_2, … , a_ka
// 要按非递增排序
// 结果中不能包含重复的组合
// 例如：给定的候选数集是[10,1,2,7,6,1,5]，目标数是8
// 解集是：
// [1, 7]
// [1, 2, 5]
// [2, 6]
// [1, 1, 6]
