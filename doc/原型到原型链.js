var log=console.log.bind(console)
function Person(){ //创建一个构造函数

}

var person1=new Person() //构造一个实例对象person1

person1.name='张三'

log(person1.name)


// 每个函数都有一个prototype属性，这是函数特有的属性

Person.prototype.name='李四'

var person2=new Person()

log(person2.name) //李四

person2.name='张三'
log(person2.name)//张三
delete person2.name
log(person2.name) //李四

log(person1.__proto__===Person.prototype)//true
log(person2.__proto__===Person.prototype)//true

// constructor

log(Person===person1.constructor)//true
log(Person===person2.constructor)//true
log(Person.prototype.constructor===person2.constructor)//true


var obj=new Object()
log(Object.prototype.__proto__)//null

