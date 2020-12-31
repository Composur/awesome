"use strict";

// 一次可以走一步或者两步，n个阶梯的楼梯有多少种走法
function go(n) {
  if (n === 0 || n === 1 || n === 2) {
    return n;
  }

  return go(n - 1) + go(n - 2);
}