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

module.exports = {
    initiateSetting
}