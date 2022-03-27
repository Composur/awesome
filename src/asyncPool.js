/**
 * 
 * @param {Number} limit 并发数量
 * @param {Array} array 请求集合
 * @param {Promise} iteratorFn 一个返回 Promise 的对象函数
 * @returns 
 */
async function asyncPool(limit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const [item, index] of new Map(array.map((item, index) => [item, index]))) {
    const p = iteratorFn(item, index);
    ret.push(p);
    if (limit <= array.length) {
      const e = p.then(() => {
        console.log('正在运行' + executing.length)
        executing.splice(executing.indexOf(e), 1)
      });
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}



const fn = url => {
  // 实际场景这里用axios等请求库 发请求即可 也不用设置延时
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('完成一个任务', url, new Date());
      resolve({ url, date: new Date() });
    }, 1000 + Math.random() * 1000);
  })
};

function limitQueue(urls, limit) {
  // 完成任务数
  let i = 0;
  // 填充满执行队列
  for (let excuteCount = 0; excuteCount < limit; excuteCount++) {
    run();
  }
  // 执行一个任务
  function run() {
    // 构造待执行任务 当该任务完成后 如果还有待完成的任务 继续执行任务
    new Promise((resolve, reject) => {
      const url = urls[i];
      i++;
      resolve(fn(url))
    }).then(() => {
      if (i < urls.length) run()
    })
  }
};




const timeout = (i) => {
  console.log('开始' + i);

  return new Promise((resolve) => setTimeout(() => {
    resolve(i);
    console.log('结束' + i);
  }, 1000 + Math.random() * 1000));
};

let urls = Array(10).fill(0).map((v, i) => i)
console.log(urls);
(async () => {
  // const res = await limitQueue(urls, 20);
  const res = await asyncPool(1, urls, timeout);
  console.log(res);
})()

