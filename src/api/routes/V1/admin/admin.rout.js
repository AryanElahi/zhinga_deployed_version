const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {signupVal, loginVal} = require("../../../../validation/announce.crud.validation")
const {getAllUsers,updateUser} = require("../../../../services/user/auth")
const {
    getAllAnnouns, 
    inPrigressStates,
    deleted_or_not_confirmed,
    uncheckedRequests
} = require("../../../../services/adminpanel/services")
const {verifyAccessToken, verifyRefreshToken} = require("../../../middlewares/isAuth.middleware")

router.get("/dashboard", async (req, res, next) => {
try {
    const user = await getAllUsers()
    const announcount = await getAllAnnouns()
    console.log(announcount)
    const inprogress = await inPrigressStates()
    const notConfirmed = await deleted_or_not_confirmed()
    const uncheckedRequest = await uncheckedRequests()

    res.send ({
        "all announcements" : announcount.number.toString(),
        "all users" : user.number.toString(), 
        "in progress ": inprogress.number.toString(),
        "deleted or not confirmed" : notConfirmed.number.toString(),
        "unchecked requests" : uncheckedRequest.number.toString()
        //"unchecked requests" : 
    })
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






router.get("/alluseres", async (req, res, next) => {
    try {
        res.send (await getAllUsers())
    } catch (error) {
        next(error)
    }
})