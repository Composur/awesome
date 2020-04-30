async function foo(){
  return new Promise(function(resolve,reject){
    setTimeout(()=>{
      reject('throw err')
    })
  })
}
try {
  await foo()
} catch (err) {
  console.log(err)
}