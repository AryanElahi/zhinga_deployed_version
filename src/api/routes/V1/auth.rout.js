const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {PrismaClient} = require("@prisma/client")
const {signupVal} = require("../../../validation/user.auth.validation")
const prisma = new PrismaClient()

router.post("/register", async (req, res, next) => {
    //console.log(req.body)
try {
    //const {full_name, password, phone } = req.body

    const result = await signupVal.validateAsync(req.body)
    console.log(result)
    const doesExistphone = await prisma.user.findUnique({
    where: {
        phone: result.phone
    }
    })
    if (doesExistphone) throw creatErrors.Conflict(" phone already exists")
    const newuser =await prisma.user.create({
        data :
            result
    })
    const getall = await prisma.user.findMany()
    res.send(getall)
} catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
}
})

router.post("/login", async (req, res, next) => {
    res.send("login")
})

router.post("/refreshToken", async (req, res, next) => {
    res.send("refresh token")
})

router.delete("/logout", async (req, res, next) => {
    res.send("logout")
})

module.exports = router