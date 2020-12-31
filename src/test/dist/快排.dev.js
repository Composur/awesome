"use strict";

// const quicky = arr => {
//   if (arr.length <= 1) {
//     return arr;
//   }
//   const midIndex = Math.floor(arr.length / 2);
//   const midNum = arr.splice(midIndex, 1)[0];
//   let leftArr = [];
//   let rightArr = [];
//   arr.forEach(item => {
//     if (item < midNum) {
//       leftArr.push(item);
//     } else {
//       rightArr.push(item);
//     }
//   });
//  return quicky(leftArr).concat([midNum], quicky(rightArr));
// };
// console.log(Math.floor(quicky([3,4,5,6,2,1,9]).length/2))
// console.log(quicky([1,3,4,5,5,2,2,34]))
function quicky() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (arr.length <= 1) return arr;
  var leftArr = [];
  var rightArr = [];
  var midIndex = Math.floor(arr.length / 2);
  var midNum = arr.splice(midIndex, 1)[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < midNum) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return quicky(leftArr).concat([midNum], quicky(rightArr));
}

console.log(quicky([1, 3, 4, 5, 5, 2, 2, 34]));