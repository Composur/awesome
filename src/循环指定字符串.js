const repate = (str,n)=>{
    // while(n){
    //   n--
    //   str+=str
    // }
    // return str
    return Array(n+1).join(str)
}
console.log(repate('q',2))