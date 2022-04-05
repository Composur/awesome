var arr = [1,3,4,8,2,6]
function test(arr,target){
  var list = []
for(var i=0;i<arr.length;i++){
  for(var j=i;j<arr.length;j++){
    for(var k = j ;k<arr.length;k++){
      if(arr[i]+arr[j]+arr[k]===target){
        list.push(arr[j])
        list.push(arr[k])
        list.push(arr[j])
      }
    }
  }
}
var result = [];
for(var i=0,len=list.length;i<len;i+=3){
   result.push(list.slice(i,i+3));
}
return result
}
console.log(test(arr,6))