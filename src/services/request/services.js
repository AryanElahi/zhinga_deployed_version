const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const createErrorrrrs = require ("http-errors")


async function creatRequest(data){
    const neww = await prisma.request.create({
        data :
            data          
    })
    return neww
}
async function getByUid(code) {
    return prisma.request.findUnique({
        where: {
            Uid : code
        }
    })
}
async function getAll() {
    const requests = await prisma.request.findMany()
    const counter = requests.length
    return ({"users" : requests, "number" : counter} )
}
async function getunchecked () {
    requests = await prisma.request.findMany({
        where: {status : false}
    })
    const counter = requests.length
    return ({"users" : requests, "number" : counter} )
}
async function getchecked () {
    return (await prisma.request.findMany({
        where: {status : true}
    }))
}
async function check (ID){
      const updated = await prisma.request.update({
      where: {Uid: ID},
      data : {status : true}
      })
    return (updated)
  }

module.exports = {
    creatRequest,
    getByUid, 
    getAll,
    getchecked,
    getunchecked,
    check
}