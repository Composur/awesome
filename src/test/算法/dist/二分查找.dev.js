"use strict";

// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，
// 写一个函数二分查找 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
// 分递归版本，简单情况
var arr = [1, 3, 5, 7, 9, 10, 11, 12, 14, 17];

function search(nums, target) {
  var left = 0;
  var right = nums.length - 1;

  while (left <= right) {
    var mid = Math.floor((right + left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

console.log(search(arr, 10)); // 时间复杂度
// n * n/2 * n/4 * n/8 * n/2^k ·····
// k=log2n，所以时间复杂度为O(logn)