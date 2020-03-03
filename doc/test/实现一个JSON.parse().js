const parse = function(obj){
  return eval('(' + obj + ')');
}
console.log(parse(JSON.stringify({a:1,b:{a:1}})));

const parseFunc = function(str){
  return  (new Function('str','return'+ str))()
}

console.log(parseFunc(JSON.stringify({a:1,b:{a:1}})));