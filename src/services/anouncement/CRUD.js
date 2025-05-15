const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const createErrors = require ("http-errors")


async function creatAnnouncement(data, userId){
    data.userID = userId
    const newAnnoun = await prisma.property.create({
        data :
            data    
    })
    return newAnnoun
}
async function photo_adding (Uid, Url){
    return await prisma.property.update({
    where: {Uid : Uid},
    data : {photo : Url}
    })
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
    return (await prisma.property.findMany({
            where: {reject : false}
}))
}
async function updateAnnoun (result){
    const code = await getByUid(result.Uid)
    return await prisma.property.update({
    where: {Uid : code.Uid},
    data : result
    })
    }

async function deleteAnnoun (ID){
      const updated = await prisma.property.delete({
      where: {Uid: ID}
      })
    return (updated)
  }


  async function search(data) {
    const { full_name, ...rest } = data;
  
    const where = {
      ...rest,
      ...(full_name && {
        full_name: {
          contains: full_name,
          mode: 'insensitive'
        }
        
      })
    };
  
    const user_announs = await prisma.property.findFirst({
      where
    });
  
    return user_announs;
  }
  
  


module.exports = {
    creatAnnouncement,
    getAllAnnouns,
    updateAnnoun,
    deleteAnnoun,
    getByStateCode,
    getByUid,
    photo_adding,
    search
}