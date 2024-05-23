const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {signupVal, loginVal} = require("../../../../validation/announce.crud.validation")
const {    creatAnnouncement,
    getAnnounByID,
    getAllAnnouns,
    getAnnounBytype,
    getAnnounByregion,
    getAnnounByAddress,
    getAnnounBydocument_type,
    getAnnounByland_metrage,
    updateAnnoun,
    deleteAnnoun } = require("../../../../services/anouncement/CRUD")
const { ref } = require("joi")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


router.get("/creat", async (req, res, next) => {
    console.log("hello")
})
router.post("/login", async (req, res, next) => {
    try {
        const result = await loginVal.validateAsync(req.body) 
        const user = await getUserByPhone(result.phone)
        const compare = await isValid(result.password, user.password)
        if (!user || result.softDelete) throw creatErrors.NotFound("user is not regesterd")
        if (compare === false) throw creatErrors.Unauthorized("username of password is not correct")
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