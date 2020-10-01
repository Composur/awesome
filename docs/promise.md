```js
// promise 接受一个函数，这个函数会立即执行
new Promise((resolve, reject) => {
    resolve('data')
}).then( // .then 也会同步执行 .then 是微任务
    value => {
        console.log(value)
    },
    reason => {
        console.log(reason)
    },
)
```



