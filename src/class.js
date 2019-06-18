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
