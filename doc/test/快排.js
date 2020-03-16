const quicky = arr => {
  if (arr.length <= 1) {
    return arr;
  }
  const midIndex = Math.floor(arr.length / 2);
  const midNum = arr.splice(midIndex, 1)[0];
  let leftArr = [];
  let rightArr = [];
  arr.forEach(item => {
    if (item < midNum) {
      leftArr.push(item);
    } else {
      rightArr.push(item);
    }
  });
 return quicky(leftArr).concat([midNum], quicky(rightArr));
};
console.log(Math.floor(quicky([3,4,5,6,2,1,9]).length/2))
