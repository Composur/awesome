//node 环境
const axios=require('axios')
const {log}=console
// const url='https://sm.ms/api/list'
const url='https://www.easy-mock.com/mock/5aae56af9593e16999e1934d/example/query'


axios({
    method: 'GET',
    url: url,
    params:{ssl:true,format:'json'}
})
.then(res => {console.log(res.data)})
.catch(err => {console.log(err)})