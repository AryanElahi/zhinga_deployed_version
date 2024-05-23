const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const JWT = require("jsonwebtoken")
const creatErrors = require ("http-errors")


async function creatAnnouncement (data){
    const newAnnoun =await prisma.property.create({
        data :
            data           
    })
    return newAnnoun
}
async function getAnnounByID (ID){
    const announ = await prisma.property.findUnique({
        where:  {
            ID : ID 
        }
    })
    return announ
}
async function getAllAnnouns () {
    return (await prisma.property.findMany())

}
async function updateAnnoun (ID, result){
  try {
    const updated = await prisma.user.update({
    where: {ID: ID},
    data : result
    })
  return (updated)
  } catch (error) {
    if (error) return(error)
  }

}
async function deleteAnnoun (ID){
    try {
      const updated = await prisma.property.delete({
      where: {ID: ID}
      })
    return ("the announcement has been deleted successfully")
    } catch (error) {
      if (error) return(error)
    }
  
  }
  async function getAnnounBytype(type){
    const announ = await prisma.property.findMany({
        where:  {
            type : type 
        }
    })
    return announ
}
async function getAnnounByregion(filter){
    const announ = await prisma.property.findMany({
        where:  {
            region : filter 
        }
    })
    return announ
}
async function getAnnounByAddress(filter){
    const announ = await prisma.property.findMany({
        where:  {
            address : filter 
        }
    })
    return announ
}
async function getAnnounBydocument_type(filter){
    const announ = await prisma.property.findMany({
        where:  {
            document_type : filter 
        }
    })
    return announ
}
async function getAnnounByland_metrage(filter){
    const announ = await prisma.property.findMany({
        where:  {
            land_metrage : filter 
        }
    })
    return announ
}


module.exports = {
    creatAnnouncement,
    getAnnounByID,
    getAllAnnouns,
    getAnnounBytype,
    getAnnounByregion,
    getAnnounByAddress,
    getAnnounBydocument_type,
    getAnnounByland_metrage,
    updateAnnoun,
    deleteAnnoun
}