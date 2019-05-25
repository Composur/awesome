//node 环境
const axios=require('axios')
const {log}=console
const url='https://sm.ms/api/list'


axios({
    method: 'GET',
    url: url,
    params:{ssl:true,format:'json'}
})
.then(res => {console.log(res.data)})
.catch(err => {console.log(err)})