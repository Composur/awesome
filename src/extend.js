function Parent(name){
    this.name=name
    this.color=['one','two','three']
}
Parent.prototype.getName=function(){
    return this.name
}

function Child(age,name){
    this.age=age
    Parent.call(this,name)
}

Child.prototype=new Parent()
Child.prototype.construstor=Child

var parent=new Parent('parent')
parent.color.push('one')
console.log(parent.color)


var child1=new Child(18,'to')
child1.color.push('oon')
console.log(child1.color)
console.log(child1.__proto__)


var child2=new Child('19','too')
console.log(child2.color)
console.log(child2.__proto__)

