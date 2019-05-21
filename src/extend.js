function Parent(name){
    this.name=name
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

var child1=new Child(18,'to')
console.log(child1)
console.log(child1.getName())

var child2=new Child('19','too')
console.log(child2)
console.log(child2.getName())