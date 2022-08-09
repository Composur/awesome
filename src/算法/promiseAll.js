console.log(1)
new Promise((resolve, reject) => {
  // 同步执行
  console.log('执行resolve')
  reject(2)
}).then(value => console.log(value),
  err => console.log(err))
  .then(v => console.log(v),
    err => console.log(err))
console.log(3)


new Promise((resolve, reject) => {
  reject('err')
})
  .then(res => { }, reason => { throw reason })
  .then(res => { }, reason => reason)
  .catch(err => {
    console.log(err)
  })


cacheList.forEach(listItem => {
  caches.forEach(cacheItem => {
    if (cacheItem.id === listItem.id) {
      // 找到要更新的对象
    }
  })
})

const cachesMap = caches.map(item => {
  return { id: item }
})
cacheList.forEach(item => {
  // 找到要更新的对象
  cachesMap[item.id]
})
/** 
 * @param {Array} array Promise对象 集合
 * @returns {Promise}
 */

const promiseAll = (array) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) {
      return reject("不是数组");
    }
    const resAll = []
    let count = 0
    array.forEach(p => {
      Promise.resolve(p).then(res => {
        count++
        resAll.push(res)
        if (count === array.length) {
          return resolve(resAll)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}

const promiseAllRace = (array) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) {
      return reject("不是数组");
    }
    array.forEach(p => {
      Promise.resolve(p).then(res => {
        return resolve(res)
      }
      ).catch(err => {
        reject(err)
      })
    })
  })
}

// promiseAll([Promise.resolve(1), Promise.resolve(2), p]).then(data => console.log(data)).catch(err => {
//   console.log(err)
// })
// promiseAllRace([p2, Promise.resolve(2), p]).then(data => console.log(data)).catch(err => {
//   console.log(err)
// })

