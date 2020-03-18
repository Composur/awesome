// 求阶乘n! 即，1×2×3×4×5×······×n（使用递归算法）

function recursion(n){
  if(n < 2){
    return 1
  }else{
    return n*recursion(n-1)
  }
}
console.log(recursion(3))