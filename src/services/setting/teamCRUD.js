const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

async function creatteam(data){
    const newteam = await prisma.team.create({
        data :
            data    
    })
    return newteam
}
async function getAllteam() {
    return (await prisma.team.findMany())
}
async function updateteam(id, data){
    const ID = Number(id)
    return await prisma.team.update({
    where: {id : ID},
    data : data
    })
    }
async function deleteteam (ID){
      const deleted = await prisma.team.delete({
      where: {id: ID}
      })
    return (deleted)
  }

module.exports = {
    creatteam,
    getAllteam,
    updateteam,
    deleteteam
}