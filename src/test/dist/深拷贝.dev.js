"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//  JSON 版本 
var newObj = function newObj(someObj) {
  return JSON.parse(JSON.stringify(someObj));
};

var deepCopy = function deepCopy(obj) {
  // 判断类型
  var type = _typeof(obj);

  if (type === 'object') {
    var _result = obj.construstor == Array ? [] : {};

    for (var i in obj) {
      _result[i] = _typeof(obj[i]) === 'object' ? deepCopy(obj[i]) : obj[i];
    }

    return _result;
  } else {
    result = obj;
  }

  return result;
};

var obj = {
  a: {
    aa: {
      aaa: 123,
      bbbb: function bbbb(s) {
        return s;
      },
      ccc: /^[0-9]$/
    }
  },
  b: {
    bb: [1, 2, 3, 4, {
      aa: 124
    }]
  }
};
var result = deepCopy(obj);
result.test = 124;
console.log(obj);
console.log(result);

var deepCopyFn = function deepCopyFn(obj) {
  var type = _typeof(obj); // 定义个空对象


  var res = obj.construstor === Array ? [] : {};

  if (type === 'object') {
    // 遍历
    for (var i in obj) {
      // 赋值
      // 判断是否是对象是的话递归
      res[i] = _typeof(obj[i]) === 'object' ? deepCopyFn(obj[i]) : obj[i];
    }

    return res; // 定义个空对象
  } else {
    return obj;
  }
}; // console.log(deepCopyFn(obj));