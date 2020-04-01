// 问题能够分解成子问题来解决，子问题的最优解能递推到最终问题的最优解
// [7,1,5,3,6,4] 输出 7
// [1,2,3,4,5] 输出 4
// [7,6,4,3,1]输出 0
var maxProfit = function(prices) {
  let max = 0;

  for (let i = 1; i < prices.length; i++)
    if (prices[i] > prices[i - 1]){
      max = max - prices[i - 1] + prices[i];
    }
  return max;
};
console.log(maxProfit([7,1,5,3,6,4]))
console.log(maxProfit([1,2,3,4,5]))
console.log(maxProfit([7,6,4,3,1]))