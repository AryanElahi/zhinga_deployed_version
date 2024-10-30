const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const createErrors = require ("http-errors")

async function creatslider(data){
    const newslider = await prisma.slider.create({
        data :
            data    
    })
    return newslider
}
async function photo_adding_slider(id, Url){
    const ID = Number(id)
    return await prisma.slider.update({
    where: {id : ID},
    data : {photo : Url}
    })
    }
async function getAllsliders() {
    return (await prisma.slider.findMany())
}
async function updateslider(id, data){
    const ID = Number(id)
    return await prisma.slider.update({
    where: {id : ID},
    data : { Title : data.Title,
        note : data.note}
    })
    }
async function deleteslider (ID){
      const deleted = await prisma.slider.delete({
      where: {id: ID}
      })
    return (deleted)
  }

module.exports = {
    getAllsliders,
    deleteslider,
    updateslider,
    creatslider,
    photo_adding_slider
}