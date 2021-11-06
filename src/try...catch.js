const bar = () => {
  return new Promise(async function (resolve, reject) {
    setTimeout(() => {
      // reject('throw err')
      reject('123')
      console.log('123')
    })
  })
}
const foo = () => {
  return new Promise(async function (resolve, reject) {
    setTimeout(() => {
      // reject('throw err')
      resolve('124')
      console.log('124')
    })
  })
}

const test = async () => {
  try {
    await foo()
    await bar()
    console.log(124)
    console.log(333333)
  } catch (err) {
    console.log('error', err)
  }
}




