const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {PrismaClient} = require("@prisma/client")
const {signupVal} = require("../../../validation/user.auth.validation")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const {signAccessToken} = require("../../../auth/handeler")


router.post("/register", async (req, res, next) => {
try {
    let result = await signupVal.validateAsync(req.body)
    console.log(result)
    const token = signAccessToken(result.phone)
    console.log(token)
    const doesExistphone = await prisma.user.findUnique({
    where: {
        phone: result.phone
    }
    })
    if (doesExistphone) throw creatErrors.Conflict(" phone already exists")
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(result.password, salt)
    result.password = hashedpass
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