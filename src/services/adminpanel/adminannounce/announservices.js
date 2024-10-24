const {PrismaClient} = require("@prisma/client")
const { use } = require("bcrypt/promises")
const prisma = new PrismaClient()

async function creatannounce (data){
    const newAnnoun = await prisma.adminproperty.create({
        data :
            data    
    })
    return newAnnoun
}
async function getAllAnnouns () {
    const announs = await prisma.property.findMany()
    console.log(announs)
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
        where : {softDelete : true}
    })
    const count = announs.length
    return ({"deleted": announs, "number": count})
}
async function search(data) {
    const user_announs = await prisma.adminproperty.findMany({
        where: data
    });
    
    const admin_announs = await prisma.adminproperty.findMany({
        where: data,
    });

    // برگرداندن هر دو نتیجه به صورت یک آبجکت
    return {
        user_announs,
        admin_announs
    };
}

module.exports = {
    creatannounce,
    getAllAnnouns,
    inPrigressStates,
    deleted_or_not_confirmed,
    search
}