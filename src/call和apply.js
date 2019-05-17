var obj={
    value:1
}
function foo(num){
     console.log(this.value)
     return this.value
}
foo.call( )  //call改变了this的指向 指向了obj

// 实现一个call 

var obj={
    value:1,  //思路：1.给要call的this值添加一个属性foo
    foo:function(){
        console.log(this.value)
    }
}

obj.foo() //2.执行

delete obj.foo //3.删除添加的属性

// 开始实现

Function.prototype.call2=function(context){
    context=context || window
    var arg=[]
    for(var i=1;i<arguments.length;i++){
        arg.push('arguments['+i+']')
    }
    context.fn=this
    var result=eval('context.fn('+arg+')') //eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
    delete context.fn
    return result
}

var testCall2=foo.call2(obj,133,2,3,4)
console.log(testCall2)

