const {log}=console

function fn1(){
    log('fn1')
}
function fn2(){
    fn3()
    log('fn2')
    fn1()
}

function fn3(){
    setTimeout(() => {
        log('fn3')
    }, 0);
}
fn2()