const express = require("express")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const creatErrors = require ("http-errors")
const { client, connectRedis, disconnectRedis } = require("./../../loader/redis")
async function softDelete (phone) {
    try {
        const updated = await prisma.user.update({
        where: {phone: phone},
        data : {softDelete: true}
        })
      return (updated)
      } catch (error) {
        if (error) return(error)
      }
}
async function promotToAdmin(phone) {
    try {
        const updated = await prisma.user.update({
        where: {phone: phone},
        data : {admin: true}
        })
      return (updated)
      } catch (error) {
        if (error) return(error)
      }
}

module.exports = {
    promotToAdmin,
    softDelete
}