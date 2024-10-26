const fs = require('fs')
const http = require('https')
const filePath = './manifest.json'
const data = fs.readFileSync(filePath)
const temp = JSON.parse(data)
const writeData = {
  name: 'xdd',
  age: 18,
  ...temp
}
fs.writeFileSync(filePath, JSON.stringify(writeData))
const file = fs.createWriteStream('file.jpg');
const request = http.get('https://www.freeimg.cn/i/2023/12/26/658a932b3beca.png', function (response) {
  const totalBytes = parseInt(response.headers['content-length'], 10);
  let receivedBytes = 0;

  response.on('data', function (chunk) {
    receivedBytes += chunk.length;
    const progress = (receivedBytes / totalBytes) * 100;
    console.log('下载进度：' + progress.toFixed(2) + '%');
  });
  response.pipe(file);
  file.on('finish', function () {
    file.close();
    console.log('文件下载完成');
  });
}).on('error', function (err) {
  // fs.unlink(dest);
  console.error(err);
});