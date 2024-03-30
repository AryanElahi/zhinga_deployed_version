const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {PrismaClient} = require("@prisma/client")
const {signupVal, loginVal} = require("../../../validation/user.auth.validation")
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
    try {
        const result = await loginVal.validateAsync(req.body) 
        res.send (result)
        const regesterd = await prisma.user.findUnique({
            where : result.phone
        })
        if (!regesterd) throw creatErrors.NotFound("user is not regesterd")
        // was in a different file
        async function (password){
            try {
                return await 
            } catch (error) {
                
            }
        }

    } catch (error) {
        if (error.isJoi === true) return next(creatErrors.BadRequest("username or password is invalid"))
        next(error)
    }
})

router.post("/refreshToken", async (req, res, next) => {
    res.send("refresh token")
})

router.delete("/logout", async (req, res, next) => {
    res.send("logout")
})

module.exports = router