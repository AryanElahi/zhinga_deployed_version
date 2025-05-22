const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const createErrors = require ("http-errors")

async function creatregion(data){
    const newregion = await prisma.region.create({
        data :
            data    
    })
    return newregion
}
async function getAllregions() {
    return (await prisma.region.findMany())
}
//async function updateVisits(Uid, data){
//    return await prisma.visit.update({
//    where: {Uid : Uid},
//    data : data
//    })
//    }
async function deleteregion (id){
      console.log(id)
      const updated = await prisma.region.delete({
      where: {id : id }
      })
    //return (updated)
  }

module.exports = {
    creatregion,
    getAllregions,
    deleteregion
}