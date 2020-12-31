"use strict";

function getArr(nums) {
  // let max = nums[0]
  // let min = nums[nums.length]
  var max = nums[0];
  var min = nums[nums.length];
  var list = [];

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      list.push(i);
    }
  }

  for (var _i = nums.length - 1; _i >= 0; --_i) {
    if (nums[_i] >= min && list.indexOf(_i) !== -1) {
      // list.remove(i);
      list.splice(_i, 1);
    } else {
      min = nums[_i];
    }
  }

  return list;
}

console.log(getArr([1, 2, 1, 5, 7, 9, 7]));