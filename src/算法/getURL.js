// 当replace匹配到name=elephant时.那么就用执行function(a,b,c);其中a的值为:name=elephant,b的值为name,c的值为elephant;(这是反向引用.因为在定义正则表达式的时候有两个子匹配.)，然后将数组的key为name的值赋为elephant;然后完成.

// 再继续匹配到age=25;此时执行function(a,b,c);其中a的值为:age=25,b的值为age,c的值为25;然后将数组的key为id的值赋为25.
function parse_url(_url) {
  //定义函数
  var pattern = /(\w+)=(\w+)/gi; //定义正则表达式
  var parames = {}; //定义数组
  _url.replace(pattern, function (a, b, c) { // k=value,k,value
    parames[b] = c;
  });
  return parames; //返回这个数组.
}

var url = "http://www.baidu.com?name=elephant&age=25&sex=male";
console.log(parse_url(url)); // { name: 'elephant', age: '25', sex: 'male' }
