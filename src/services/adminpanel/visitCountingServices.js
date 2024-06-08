const express = require('express')
const requestIp = require('request-ip')
const app = express()
const port = 3000

async function get_exact_date(){
    let ts = Date.now();
    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();
    const final = (year + "-" + month + "-" + date);
    const spliter = final.split('-')
    console.log()
    return ({"year": spliter[0], "month": spliter[1], "day": spliter[2]})
}
async function get_ip (req){
    const clientIp = requestIp.getClientIp(req)
    return clientIp
}
app.get('/', async (req, res) => {
    const ip = await get_ip(req)
    const date = await get_exact_date()
    console.log(ip, date.day )
    res.send()
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
get_exact_date()