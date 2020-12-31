"use strict";

function test() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var num = arguments.length > 1 ? arguments[1] : undefined;
  if (!num) return;
  var newArr = arr.filter(function (item) {
    return item < num;
  });
  return newArr.length;
} // console.log(test([1, 2, 3, 4],7))
// 有一个数组和一个值，需要求大于等于该值的最小长度，例如[2, 3, 4, 7]和5，
// 那么最小就是1，因为7大于5 如果数字是8，那么最小就是2, 因为4 + 7大于8


function test02() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var num = arguments.length > 1 ? arguments[1] : undefined;
  var newArr = [];
  var totalCount = 0;
  arr = arr.reverse();

  for (var i = 0; i < arr.length; i++) {
    totalCount += arr[i];
    newArr.push(arr[i]);

    if (totalCount > num) {
      return newArr;
    }
  }
}

console.log(test02([1, 2, 3, 7], 8));
(function tset() {}).construstor === Function;