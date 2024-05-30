const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const creatErrors = require ("http-errors")


async function creatAnnouncement(data){
    console.log(data)
    const newAnnoun = await prisma.property.create({
        data :
            data          
    })
    return newAnnoun
}
async function getByStateCode (code) {
    return prisma.property.findFirst({
        where: {
            state_code : code
        }
    })
}
async function getByUid (code) {
    return prisma.property.findUnique({
        where: {
            Uid : code
        }
    })
}
async function getAllAnnouns () {
    return (await prisma.property.findMany())

}
async function updateAnnoun (result){
    const code = await getByUid(result.Uid)
    console.log(code.state_code, result)
    return await prisma.property.update({
    where: {Uid : code.Uid},
    data : result
    })
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
    getAllAnnouns,
    getAnnounBytype,
    getAnnounByregion,
    getAnnounByAddress,
    getAnnounBydocument_type,
    getAnnounByland_metrage,
    updateAnnoun,
    deleteAnnoun,
    getByStateCode,
    getByUid
}