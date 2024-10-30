const {PrismaClient} = require("@prisma/client")
const { use } = require("bcrypt/promises")
const prisma = new PrismaClient()

async function initiateSetting (data){
    const newAnnoun = await prisma.setting.create({
        data :
            data    
    })
    return newAnnoun
}
async function logoAdding(Url){
    const ID = Number(id)
    return await prisma.setting.update({
    where: {id : 1},
    data : {photo : Url}
    })
    }
async function aboutUpdating(data){
    return await prisma.setting.update({
        where: {id : 1},
        data : {about : data.about,
                goals : data.goals
        }
        })
        }
module.exports = {
    initiateSetting,
    logoAdding,
    aboutUpdating
}