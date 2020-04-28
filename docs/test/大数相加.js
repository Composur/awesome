function add(a, b) {
  // 保存最终结果
  var res = "";

  // 保存两位相加的结果 和 进位值
  var c = 0;

  // 字符串转数组
  a = a.split("");
  b = b.split('')
  while (a.length || b.length || c) {
    // ~~ 用来把String类型 转为 Number类型
    // 把两位相加的结果 和 进位值相加
    c += +a.pop() + +b.pop();

    // 取余，把余数拼接到最终结果中
    res = (c % 10) + res;

    // 保存进位，true 或者 false
    c = c > 9;
  }
  return res;
}
console.log(add("11111111111111111", "22222222222222222"))
