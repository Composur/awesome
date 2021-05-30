const animals = [{type:'foo'},{type:'bar'},{type:'bar'},{type:'bar'},{type:'bar'},{type:'foo'}];
const firstIndex = animals.lastIndexOf(item=>{
    console.log(item)
    return item.type==='foo'
});
console.log(firstIndex);


