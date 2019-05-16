const {log}=console

// 遇到函数执行的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出

var foo=()=>{
    log('foo01')
}

foo()

var foo=()=>{
    log('foo02')
}
foo()

function foo() {

    console.log('foo1');

}
foo();  // foo2

function foo() {

    console.log('foo2');

}

foo(); // foo2