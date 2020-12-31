"use strict";

var list = [1, 2, 3];

var square = function square(num) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(num * num);
    }, 1000);
  });
}; // 原型
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


function test() {
  var _i, _list, i, res;

  return regeneratorRuntime.async(function test$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _i = 0, _list = list;

        case 1:
          if (!(_i < _list.length)) {
            _context.next = 10;
            break;
          }

          i = _list[_i];
          _context.next = 5;
          return regeneratorRuntime.awrap(square(i));

        case 5:
          res = _context.sent;
          console.log(res);

        case 7:
          _i++;
          _context.next = 1;
          break;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
} // 等价于
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


test();