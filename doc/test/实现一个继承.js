function Parent(name) {
  this.name = name
  this.arr = [1,2,3]
}
Parent.prototype.say = function () {
  console.log('p',this.name)
}

function Child(name) {
  Parent.call(this)
  this.name = name
}
// 原型链继承
Child.prototype = new Parent()

var c = new Child('子')
var s = new Child('子')

// 共享实例
c.arr.push(4)
console.log(c.arr) // [ 1, 2, 3, 4 ]
console.log(s.arr) // [ 1, 2, 3, 4 ]

