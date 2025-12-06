// utils/fixUrl.js
export function fixUrl(url) {
  if (!url) return url;

  // 如果是相对路径，直接返回（由浏览器自动补协议）
  if (url.startsWith('//') || url.startsWith('/')) return url;

  const currentProtocol = window.location.protocol; // 'http:' or 'https:'

  // 如果后端返回 http 但当前是 https，则改成 https
  if (url.startsWith('http://') && currentProtocol === 'https:') {
    return url.replace(/^http:/, 'https:');
  }

  // 如果后端返回 https 但当前是 http，也改成 http（可选）
  if (url.startsWith('https://') && currentProtocol === 'http:') {
    return url.replace(/^https:/, 'http:');
  }

  return url;
}

