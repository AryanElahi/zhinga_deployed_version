const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const creatErrors = require ("http-errors")

async function creatslider(data){
    const newslider = await prisma.slider.create({
        data :
            data    
    })
    return slider
}
async function photo_adding(id, Url){
    return await prisma.property.update({
    where: {id : id},
    data : {photo : Url}
    })
    }
async function getAllsliders() {
    return (await prisma.slider.findMany())
}
async function updateslider(id, data){
    return await prisma.deal.update({
    where: {id : id},
    data : data
    })
    }
async function deleteslider (ID){
      const updated = await prisma.visit.delete({
      where: {id: ID}
      })
    return (updated)
  }

module.exports = {
    getAllsliders,
    deleteslider,
    updateslider,
    creatslider,
    photo_adding
}