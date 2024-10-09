const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {signupVal, loginVal, phone, codephone} = require("../../../../validation/user.auth.validation copy")
const {doesExistphone, hashPassword, signRefreshToken, creatUser, 
    saveRefreshToken, getUserByPhone, isValid, signAccessToken, getUserByAccessToken, updateUser} = require("../../../../services/user/auth")
const {verifyAccessToken, verifyRefreshToken} = require("../../../middlewares/isAuth.middleware")
const { ref, number } = require("joi")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {    
    generateNewCodeForThisNumber,
    CheckIfCorrect,
    sendSMS, getRandomInt, saveCodeInDB
} = require ("../../../../services/user/sms")
const { HttpStatusCode } = require("axios")
const { check } = require("prisma")

router.post ("/sendcode", async (req, res, next) =>
    {
        let result = await phone.validateAsync (req.body)
        if (await doesExistphone(result.phone) === true) throw creatErrors.Conflict("phone already exists")
        await creatUser(result.phone)
        phone = result.phone
        code = getRandomInt()
        await sendSMS(code, phone)
        await saveCodeInDB(code, phone)
        res.status(200).send("ok")
    })
router.post ("/varify", async (req, res, next) =>
    {
        let result = await codephone.validateAsync (req.body)
        const phone = result.phone
        const code = result.code
        const status = await CheckIfCorrect(code, phone)
        if (status == 1) {
            res.status(200).send("ok")
        } if ( status == 2 ){
            res.status(200).send("code is not true")
        } if ( status == 3) {
            res.status(200).send("code expired")
        }
    })
router.post("/register", async (req, res, next) => {
try {
    console.log(req.body)
    let result = await signupVal.validateAsync (req.body)
    result.password = await hashPassword(result.password)
    await creatUser(result)
    console.log(await getUserByPhone(result.phone))
    await saveRefreshToken(await signRefreshToken(result.phone), result.phone)
    res.send(await getUserByPhone(result.phone))
} catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
}
})

router.post("/login", async (req, res, next) => {
    try {
        const result = await loginVal.validateAsync(req.body) 
        const user = await getUserByPhone(result.phone)
        const compare = await isValid(result.password, user.password)
        if (!user || result.softDelete) throw creatErrors.NotFound("user is not regesterd")
        if (compare === false) throw creatErrors.Unauthorized("username or password is not correct")
        const refreshToken = await signRefreshToken(user.phone)
        const AccessToken = await signAccessToken(user.phone)
        res.send({refreshToken, AccessToken})
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        if (error.isJoi === true) return next(creatErrors.BadRequest("username or password is invalid"))
        next(error)
    }
})

router.post("/refreshToken", async (req, res, next) => {
    try {
        const {refreshToken} = req.body
        if (!refreshToken) throw creatErrors.BadRequest()
        const phone = await verifyRefreshToken(refreshToken)
        const AccessToken = await signAccessToken(phone)
        const RefreshToken = await signRefreshToken(phone)
        res.send ({AccessToken, RefreshToken})
    } catch (error) {
        if (error) throw error
    }
})

router.put ("/updateuser", async (req, res) => {
    try {
        let result = await signupVal.validateAsync(req.body)
        if (!req.headers["authorization"]) next (creatErrors.Unauthorized())
        const authheader = req.headers["authorization"]
        let phone = await getUserByAccessToken(authheader)
        res.send(await updateUser(phone, result))
    } catch (error) {
        if (error) throw error
    }

})
router.delete("/logout", async (req, res, next) => {
    res.send("logout")
})

module.exports = router