var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
var newArr = Array.from(new Set(arr.flat(4)))
newArr.sort((a,b)=>a-b)
console.log(newArr)

