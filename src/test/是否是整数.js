function isNum(num){
  return (typeof num === 'number' && num%1===0)?true:false
}
console.log(isNum('333'))
console.log(isNum(1))
console.log(isNum(1.1))