const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const creatErrors = require ("http-errors")

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
module.exports = {
    getAllAnnouns,
    inPrigressStates,
    deleted_or_not_confirmed
}