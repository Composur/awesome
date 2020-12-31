"use strict";

// 共有60块砖，60人搬，男搬5，女搬3，两个小孩搬1块，一次搬完，需要小孩、男人、女人各多少人，有几种组合方案？ 解答：
function solution() {
  var x, y, z;

  for (x = 1; x < 12; x++) {
    for (y = 1; y < 20; y++) {
      z = 60 - x - y;

      if (z % 2 == 0) {
        if (5 * x + y * 3 + z / 2 == 60) {
          console.log(x, y, z, '搬砖组合'); // 5 3 52
        }
      }
    }
  }
}

solution();