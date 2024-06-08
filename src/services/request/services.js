const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const creatErrors = require ("http-errors")


async function creatRequest(data){
    console.log(data)
    const neww = await prisma.request.create({
        data :
            data          
    })
    return neww
}
async function getByUid(code) {
    return prisma.property.findUnique({
        where: {
            Uid : code
        }
    })
}
async function getAll() {
    return (await prisma.property.findMany())
}
async function getunchecked () {
    return (await prisma.request.findMany({
        where: {status : false}
    }))
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