const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const creatErrors = require ("http-errors")

async function getAllAnnouns () {
    const announs = await prisma.property.findMany()
    console.log(announs)
    const counter = announs.length
    return ({"announce": announs, "number": counter})
}
module.exports = {
    getAllAnnouns
}