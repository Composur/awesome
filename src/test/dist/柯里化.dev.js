"use strict";

function curry(fn) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var length = fn.length;
  return function () {
    var newArgs = args.concat(Array.prototype.slice.call(arguments));

    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    } else {
      //  这里合并成一个参数对象[2,3,4] 传递过去一并计算
      return fn.apply(this, newArgs);
    }
  };
}

function multiFn(a, b, c) {
  return [a, b, c];
}

var multi = curry(multiFn);
console.log(multi(2)(3)(4)); // 24

console.log(multi(2, 3, 4)); // 24

console.log(multi(2)(3, 4)); // 24

console.log(multi(2, 3)(4)); // 24