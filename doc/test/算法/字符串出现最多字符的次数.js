var a = 'faewfaejopjgrjgoahrehfhdahfliaehf';
var l = a.length;
var count = 0;

for(var i=0; i<l; i++){
    var temp=0;
    for(var n=0;n<l;n++){
        if(a.charAt(n) == a.charAt(i)){
             temp++;
        }
    }        
    if(temp > count){
        count = temp;
    }
};
console.log(count)
let count1=0
for(let i=0 ;i<l;i++){
  var temp=0;
  for(let j=0;j<l;j++){
    if(a[i]===a[j]){
      temp++
    }
  }
  if(temp>count1){
    count1=temp
  }
}
console.log(count1)