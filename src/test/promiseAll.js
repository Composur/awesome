const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve(3)
  }, 2000);
})
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 延时两秒')
  }, 2000)
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

promiseAll([Promise.resolve(1), Promise.resolve(2), p]).then(data => console.log(data)).catch(err => {
  console.log(err)
})
promiseAllRace([p2, Promise.resolve(2), p]).then(data => console.log(data)).catch(err => {
  console.log(err)
})
