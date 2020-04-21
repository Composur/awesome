// 这个数列从第3项开始，每一项都等于前两项之和。
function fibonacci(n) {
  if (n == 0) return 0;
  else if (n == 1) return 1;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}
// console.log(fibonacci(300));


function memozi(fn){
  var r = {}
  return function(n){
    if(r[n] == null){
      r[n] = fn(n)
      return r[n]
    }else{
        return r[n]
    }
  }
}

var fibfn = memozi(function(n){
    if(n==0){
        return 0
    }else if(n==1){
        return 1
    }else{
        return fibfn(n-1) + fibfn(n-2)
    }
})
console.log(fibfn(100))