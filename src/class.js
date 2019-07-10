class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say() {
        console.log(`I'm ${this.name}`)
    }
}

class Child extends Person {
    constructor(name, age, id) {
        super(name, age) //如果一个子类，通关关键字extends继承父类，在子类的constructor必须优先调用super()
        // super()是一个函数，是父类constructor的一个引用
        this.id = id
    }
}
const child = new Child('张三', 18, 'hahah')

console.log(child)


class A {
    static hello() {
        console.log('hello world');
    }
}

class B extends A {

}

var  s=new B()


function Person1(name,age){
    this.name=name
    this.age=age
}

Person1.prototype.showName=function(){
    console.log(this.name)
}
Person1.prototype.showAge=function(){
    console.log(this.age)
}


function setWorker(name,age,job){
    Person1.call(this,name,age)
    this.job=job
}

setWorker.prototype=new Person1()
setWorker.prototype.constructor=setWorker

var work=new setWorker(1,2,3)
console.log(typeof work)