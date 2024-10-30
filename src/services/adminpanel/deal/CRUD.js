const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const createErrorrs = require ("http-errors")

async function creatdeal(data){
    const newdeal = await prisma.deal.create({
        data :
            data    
    })
    return newdeal
}
async function getAlldeals() {
    return (await prisma.deal.findMany())
}
async function updatedeal(Uid, data){
    return await prisma.deal.update({
    where: {Uid : Uid},
    data : data
    })
    }
async function deletedeal (ID){
      const updated = await prisma.deal.delete({
      where: {Uid: ID}
      })
    return (updated)
  }

module.exports = {
    creatdeal,
    getAlldeals,
    updatedeal,
    deletedeal
}