const { log } = console
// 获取nodejs（第一个）输入的变量
const userAction = process.argv[process.argv.length - 1]
// 计算机随机出一个
let random = Math.random() * 3
let computerAction;
const rock = 'rock', paper = 'paper', scissor = 'scissor';
if (random < 1) {
  computerAction = rock
} else if (random > 2) {
  computerAction = paper
} else {
  computerAction = scissor
}
if (userAction === computerAction) {
  log('平局！！')
} else if (
  (userAction === rock && computerAction == scissor) ||
  (userAction === paper && computerAction == rock) ||
  (userAction === scissor && computerAction == paper)
) {
  log('你赢了！！')
} else {
  log('你输了！！')
}