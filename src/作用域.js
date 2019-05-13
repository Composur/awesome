
const {log}=console
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo(); //函数的作用域是函数定义的时候就决定的，如果内部找不到value 根据书写的位置查找上一层的是否有value
}

bar();

var scope01 = "global scope";
function checkscope01(){
    var scope = "local scope";
    function f(){
        return scope
    }
    return f();
}
log(checkscope01())


var scope02 = "global scope";
function checkscope02(){
    var scope = "local scope";
    function f(){
        return scope
    }
    return f;
}
log(checkscope02())