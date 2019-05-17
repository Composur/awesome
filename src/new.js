function Foo(name,age){
    this.name=name
    this.age=age
    this.say=function(){
        console.log('say Hi')
    }
}

var fn=new Foo() //new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

fn.say()

function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}