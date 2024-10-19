const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const creatErrors = require ("http-errors")

async function creatvisit(data){
    data.userID = userId
    const newAnnoun = await prisma.visit.create({
        data :
            data    
    })
    return newAnnoun
}
async function getAllVisits() {
    return (await prisma.visit.findMany())
}
async function updateVisits(result){
    const code = await getByUid(result.Uid)
    console.log(code.state_code, result)
    return await prisma.visit.update({
    where: {Uid : code.Uid},
    data : result
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