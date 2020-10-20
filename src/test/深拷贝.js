//  JSON 版本 
const newObj = (someObj) => JSON.parse(JSON.stringify(someObj))


const deepCopy = (obj) => {
    // 判断类型
    const type = typeof obj
    if (type === 'object') {
        const result = obj.construstor == Array ? [] : {}
        for (let i in obj) {
            result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
        }
        return result
    } else {
        result = obj
    }
    return result
}

var obj = {
    a: {
        aa: {
            aaa: 123,
            bbbb: function (s) {
                return s
            },
            ccc: /^[0-9]$/
        }
    },
    b: {
        bb: [1, 2, 3, 4, {
            aa: 124
        }]
    }
}

var result = deepCopy(obj)
result.test = 124
console.log(obj)
console.log(result)
var deepCopyFn = (obj) => {
    const type = typeof obj
    // 定义个空对象
    let res = obj.construstor === Array ? [] : {}
    if (type === 'object') {

        // 遍历
        for (let i in obj) {
            // 赋值
            // 判断是否是对象是的话递归
            res[i] = typeof obj[i] === 'object' ? deepCopyFn(obj[i]) : obj[i]
        }
        return res; // 定义个空对象
    } else {
        return obj
    }

}
// console.log(deepCopyFn(obj));