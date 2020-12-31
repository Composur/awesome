"use strict";

/**
 * 求字符串数组的最长公共前缀
  比如输入: ["flower","flow","flight"]，输出: "fl"
 */
var arr = ["flower", "flow", "flight"];

var getLongCommonPrefix = function getLongCommonPrefix(arr) {
  if (arr !== null && arr.length === 0) return "";
  if (arr.length === 1) return arr[0]; // 先获取数组中的最大值及最小值字符串

  var min = 0,
      max = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[min] > arr[i]) min = i;
    if (arr[max] < arr[i]) max = i;
  } // 最小字符串与最大字符串的最长公共前缀也为其他字符串的公共前缀，即为字符串数组的最长公共前缀


  for (var j = 0; j < arr.length; j++) {
    if (arr[min].charAt(j) !== arr[max].charAt(j)) {
      return arr[min].substring(0, j);
    }
  }

  return arr[min];
};

console.log(getLongCommonPrefix(arr));