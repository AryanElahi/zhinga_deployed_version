const express = require('express')
const requestIp = require('request-ip')
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const app = express()
const port = 3000

async function get_exact_date(){
    let ts = Date.now();
    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();
    const final = (year + "-" + month + "-" + date);
    //const spliter = final.split('-')
    //console.log()
    return (final)
}
async function get_ip (req){
    const clientIp = requestIp.getClientIp(req)
    return clientIp
}
async function save_visitor (req) {
    const date = await get_exact_date()
    const ip = await get_ip(req)
    const data = {"date": date, "ip": ip}
    const visitor = await prisma.visitor.create({
        data : data
    })
    return visitor
}
async function get_all_visitors (){
    const visitor = await prisma.visitor.findMany()
    const number = visitor.length
    return ({"visitor": visitor, "number": number})
}
app.get('/', async (req, res) => {

    res.send( await get_all_visitors())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})