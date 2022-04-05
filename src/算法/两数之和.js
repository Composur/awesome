const nums = [2, 7, 11, 15]

// 用字典实现
const findIndex = target => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = target - nums[i]
    if (map.has(num)) {
      return [map.get(num), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
console.log(findIndex(9))