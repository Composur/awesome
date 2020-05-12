function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject("不是数组");
    }
    let res = [];
    let resolveCount = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (data) => {
          resolveCount++;
          res.push(data);
          if (resolveCount === promises.length) {
            return resolve(res);
          }
        },
        function(err) {
          return reject(err);
        }
      );
    }
  });
}
console.log(promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(data=>console.log(data)));
