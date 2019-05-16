function foo() {
    console.log(a);
    a = 1;
}

foo(); // a is not defined

function bar() {
    a = 1;
    console.log(a);
}
bar(); // 1
