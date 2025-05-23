const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

async function creatannounce (data, userId){
    data.userID = userId
    const newAnnoun = await prisma.property.create({
        data :
            data    
    })
    return newAnnoun
}
async function getAllAnnouns () {
    const announs = await prisma.property.findMany()
    const counter = announs.length
    return ({"announce": announs, "number": counter})
}
async function inPrigressStates() {
    const announs = await prisma.property.findMany({
        where : {check : false}
    })
    const count = announs.length
    return ({"inprogress": announs, "number": count})
}
async function deleted_or_not_confirmed (){
    const announs = await prisma.property.findMany({
        where : {reject : true}
    })
    const count = announs.length
    return ({"deleted": announs, "number": count})
}
async function updateAnnoun (result){
    const code = await getByUid(result.Uid)
    return await prisma.property.update({
    where: {Uid : code.Uid},
    data : result
    })
}
async function delete_photos (uid){
    return await prisma.property.update({
    where: {Uid :uid},
    data : { photo: [] }
    })
}
async function search(data) {
        const { full_name, address, ...rest } = data;
      
        const where = {
          ...rest,
          ...(full_name && {
            full_name: {
              contains: full_name,
              mode: 'insensitive'
            }
          }),
          ...(address && {
            address: {
              contains: address,
              mode: 'insensitive'
            }
          })
        };
      
        const user_announs = await prisma.property.findMany({
          where
        });
      
        return user_announs;
}
async function getByUid (code) {
    return prisma.property.findUnique({
        where: {
            Uid : code
        }
    })
}
async function photo_adding (Uid, Url){
    return await prisma.property.update({
    where: {Uid : Uid},
    data : {photo : Url}
    })
}
async function checkAnnounce (ID, stateCode){
      const updated = await prisma.property.update({
      where: {Uid: ID},
      data : {check : true,
            state_code : stateCode
      }
      })
    return (updated)
}
async function rejectAnnoun(ID){
    const updated = await prisma.property.update({
    where: {Uid: ID},
    data : {reject : true}
    })
  return (updated)
}

module.exports = {
    creatannounce,
    getAllAnnouns,
    inPrigressStates,
    deleted_or_not_confirmed,
    search,
    checkAnnounce,
    rejectAnnoun, 
    updateAnnoun ,
    photo_adding,
    getByUid,
    delete_photos
}