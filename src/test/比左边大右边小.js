function getArr(nums){
  // let max = nums[0]
  // let min = nums[nums.length]
  let   = nums[0]
  let min = nums[nums.length]
  const list = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
        max = nums[i];
        list.push(i);
    }
  }
  for (let i = nums.length - 1; i >= 0; --i) {
    if (nums[i] >= min && list.indexOf(i)!==-1) {
        // list.remove(i);
        list.splice(i,1)
    } else {
        min = nums[i];
    }
  }
  return list
}
console.log(getArr([1,2,1,5,7,9,7]))