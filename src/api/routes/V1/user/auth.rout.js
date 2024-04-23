const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {PrismaClient} = require("@prisma/client")
const {signupVal, loginVal} = require("../../../../validation/user.auth.validation")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const {signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken} = require("../../../../auth/handeler")
const { ref } = require("joi")

router.post("/register", async (req, res, next) => {
try {
    let result = await signupVal.validateAsync(req.body)
    const doesExistphone = await prisma.user.findUnique({
    where: {
        phone: result.phone
    }
    })
    if (doesExistphone) throw creatErrors.Conflict("phone already exists")

    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(result.password, salt)
    result.password = hashedpass
    const refreshToken = await signRefreshToken(result.phone)
    const newuser =await prisma.user.create({
        data :
            result            
    })
    const RT =await prisma.user.update({
    where: {phone: result.phone},
    data : {refreshToken : refreshToken}
    })
    const getall = await prisma.user.findMany()
    res.send({getall})
} catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
}
})

router.post("/login", async (req, res, next) => {
    try {
        const result = await loginVal.validateAsync(req.body) 
        console.log(result)
        const regesterd = await prisma.user.findUnique({
            where: {
                phone: result.phone
            }
            })
        console.log(regesterd)
        if (!regesterd || result.softDelete ) throw creatErrors.NotFound("user is not regesterd")
        // was in a different file
        async function isValid(password){
            try {
                bcrypt.compare(password, regesterd.password ,(err, data) => {
                    if (err) throw err
                    if (data) {
                        console.log(AccessToken)
                        //res.send ({AccessToken})
                    }
                    if (!data) throw creatErrors.Unauthorized("username of password is not correct")
                })
            } catch (error) {
                throw error
            }
        }
        isValid(result.password)
        const refreshToken = await signRefreshToken(regesterd.phone)
        const AccessToken = await signAccessToken(regesterd.phone)
        res.send({refreshToken, AccessToken})
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        if (error.isJoi === true) return next(creatErrors.BadRequest("username or password is invalid"))
        next(error)
    }
})

router.post("/refreshToken", async (req, res, next) => {
    try {
        const {RefreshToken} = req.body
        if (!RefreshToken) throw creatErrors.BadRequest()
        const phone = await verifyRefreshToken(RefreshToken)
        const AccessToken = await signAccessToken(phone)
        const refreshToken = await signRefreshToken(phone)
        res.send ({AccessToken, refreshToken})
        
    } catch (error) {
        if (error) throw error
    }
})

router.delete("/logout", async (req, res, next) => {
    res.send("logout")
})

module.exports = router