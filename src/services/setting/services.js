const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

async function initiateSetting (data){
    const newAnnoun = await prisma.setting.create({
        data :
            data    
    })
    return newAnnoun
}
async function logoAdding(Url){
    return await prisma.setting.update({
    where: {id : 1},
    data : {logo : Url}
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
async function get_about(data){
    return await prisma.setting.findFirst({
            where: {id : 1}
            })
            }
module.exports = {
    initiateSetting,
    logoAdding,
    aboutUpdating,
    get_about
}