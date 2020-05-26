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
//   list.forEach(async x=> {
//     const res = await square(x)
//     console.log(res)
//   })
// }
function test() {
  list.forEach((x,i) => {
    setTimeout( async ()=>{
      const res = await square(x);
      console.log(res);
    },i*1000) // 将迭代索引*1000
  });
}
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