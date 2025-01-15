const obj = {
  name: 'John',
  id: 123,
  item: JSON.stringify({ name: 'item1', id: "30957204937590724752050928043", code: 3248972394723888 }),
}
// Convert JSON strings to objects
export function convertJSONStringsInObject(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // 仅尝试解析可能是 JSON 的字符串
    if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
      try {
        acc[key] = JSON.parse(value, (key, value) => {
          // 如果值是字符串，且长度超过 15 且是数字字符串，保留原始字符串
          if (typeof value === 'string' && /^[0-9]+$/.test(value) && value.length > 15) {
            return value;
          }
          return value;
        });
      } catch {
        acc[key] = value; // 如果解析失败，保留原始值
      }
    } else {
      acc[key] = value; // 非 JSON 字符串直接保留
    }
    return acc;
  }, {});
}

console.log(convertJSONStringsInObject(obj))