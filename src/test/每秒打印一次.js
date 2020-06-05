const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};
// 原型
// function test() {
//   list.forEach(async x=> { //forEach是不能阻塞的，默认是请求并行发起，所以是同时输出1、4、9
//     const res = await square(x)
//     console.log(res)
//   })
// }

// function test() {
//   list.forEach((x,i) => {
//     setTimeout( async ()=>{
//       const res = await square(x);
//       console.log(res);
//     },i*1000) // 将迭代索引*1000
//   });
// }
 async function test() {
  for(let i of list){
    const res = await square(i)
    console.log(res)
  }
}
// 等价于
// async function test() {
//   const res = await square(1)
//   console.log(res)
//   const res2 = await square(2)
//   console.log(res)
//   const res3 = await square(3)
//   console.log(res)
// }

// async function test(x) {
//   const res = await square(x);
//   console.log(res);
// }

// function nextStep(i) {
//   if (i < list.length) {
//     test(list[i]);
//     setTimeout(nextStep, 1000, ++i);
//   }
// }
// nextStep(0);
test()


