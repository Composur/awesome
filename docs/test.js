Function.prototype.bind2 = function (scope) {
  let args = [...arguments].slice(1)
  let fn = this
  return function () {
   return fn.apply(scope, args.concat(...arguments))
  }
}


x = 321
var a = {
  x: 123,
  getX() {
    return this.x
  }
}
console.log(a.getX());

var b = a.getX

console.log(b());

var b = a.getX.bind2(a, 2)

console.log(b());