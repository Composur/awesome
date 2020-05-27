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
// fn2()
setTimeout(()=>{
    console.log(1) 
 },0)
 let a=new Promise((resolve)=>{
     console.log(2)
     resolve()
 }).then(()=>{
    console.log(3) 
 }).then(()=>{
    console.log(4) 
 })
 console.log(5) 
 
