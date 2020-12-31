"use strict";

var parse = function parse(obj) {
  return eval('(' + obj + ')');
};

console.log(parse(JSON.stringify({
  a: 1,
  b: {
    a: 1
  }
})));

var parseFunc = function parseFunc(str) {
  return new Function('str', 'return' + str)();
};

console.log(parseFunc(JSON.stringify({
  a: 1,
  b: {
    a: 1
  }
})));