const fs = require('fs')
const filePath = './manifest.json'
const data = fs.readFileSync(filePath)
const temp = JSON.parse(data)
const writeData = {
  name: '许通',
  age: 18,
  ...temp
}
fs.writeFileSync(filePath, JSON.stringify(writeData))