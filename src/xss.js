// 自定义的 XSS 过滤规则
const richTextXSS = ['alert', 'onload(.*?)=', '<script(.*?)>', 'javascript:', 'onerror(.*?)='];

// 定义 XSS 过滤器函数
function filterXSS(input) {
  let safeInput = input;

  // 遍历每个规则，将匹配内容替换为空字符串
  for (const pattern of richTextXSS) {
    const regex = new RegExp(pattern, 'gi');
    safeInput = safeInput.replace(regex, '');
  }

  // 额外清除一些常见危险标签
  // 移除 <script>、<iframe>、<object> 等标签
  safeInput = safeInput.replace(/<script.*?>.*?<\/script>/gi, '');
  safeInput = safeInput.replace(/<iframe.*?>.*?<\/iframe>/gi, '');
  safeInput = safeInput.replace(/<object.*?>.*?<\/object>/gi, '');
  safeInput = safeInput.replace(/<embed.*?>.*?<\/embed>/gi, '');

  return safeInput;
}

// 示例：用户的富文本输入
const userInput = '<img src="x" onerror="alert(1)">Hello <b>World</b><script>alert("XSS")</script>';
const safeOutput = filterXSS(userInput);

console.log(safeOutput);  // 输出过滤后的安全 HTML
