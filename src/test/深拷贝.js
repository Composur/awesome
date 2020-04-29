//  JSON 版本 
const newObj = (someObj)=>JSON.parse(JSON.stringify(someObj))


const deepCopy = (obj)=>{
  // 判断类型
  const type = typeof obj 
  if(type === 'object'){
    const result = obj.construstor == Array ? [] :{}
    for(let i in obj){
      result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
    }
    return result
  }else{
    result = obj
  }
  return result
}

var obj = {
  a:{
    aa:{
      aaa:123,
      bbbb:function (s) {return  s},
      ccc:/^[0-9]$/
    }
  },
  b:{bb:1}
}

var result = deepCopy(obj)
result.test = 124
console.log(obj)
console.log(result)
console.log(newObj(obj))