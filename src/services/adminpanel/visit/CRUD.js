const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const createErrors = require ("http-errors")

async function creatvisit(data){
    const newvisit = await prisma.visit.create({
        data :
            data    
    })
    return newvisit
}
async function getAllVisits() {
    return (await prisma.visit.findMany())
}
async function updateVisits(Uid, data){
    return await prisma.visit.update({
    where: {Uid : Uid},
    data : data
    })
    }
async function deleteVisits (ID){
      const updated = await prisma.visit.delete({
      where: {Uid: ID}
      })
    return (updated)
  }

module.exports = {
    creatvisit,
    getAllVisits,
    updateVisits,
    deleteVisits
}