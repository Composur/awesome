
/**
 * 示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]

来源：力扣（LeetCode）
 */

const getArr = (first, second) => {
  const res = []
  const map1 = new Map()
  first.forEach(element => {
    map1.set(element, true)
  });
  second.forEach(_ => {
    if (map1.has(_)) {
      res.push(_)
    }
    map1.delete(_)
  })
  return res
}
console.log(getArr([1, 2, 2, 1], [2, 2]))
console.log(getArr([4, 9, 5], [9, 4, 9, 8, 4]))