const requestIp = require('request-ip')
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

async function get_exact_date(){
    let ts = Date.now();
    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();
    const final = (year + "-" + month + "-" + date);
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
async function get_daily_visitors () {
    const date = await get_exact_date()
    const visitors = await prisma.visitor.findMany({
        where : {
            date : date
        }
    })
    const number = visitors.length
    return number

}
async function get_all_visitors (){
    const visitor = await prisma.visitor.findMany()
    const number = visitor.length
    return ({"visitor": visitor, "number": number})
}

module.exports = {
    get_ip,
    get_exact_date,
    save_visitor,
    get_daily_visitors,
    get_all_visitors
}
