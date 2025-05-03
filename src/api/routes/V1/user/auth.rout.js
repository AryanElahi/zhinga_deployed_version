const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const {signupVal, loginVal, phone, codephone, updateVal, resetpassval} = require("../../../../validation/user.auth.validation copy")
const {doesExistphone, hashPassword, signRefreshToken, creatUser, 
     getUserByPhone, isValid, signAccessToken, getUserByAccessToken, updateUser, userPhoneVarify, getUserAnnounce, resetpass} = require("../../../../services/user/auth")
const {verifyAccessToken, verifyRefreshToken} = require("../../../middlewares/isAuth.middleware")
const {    
    generateNewCodeForThisNumber,
    CheckIfCorrect,
    sendSMS, getRandomInt, saveCodeInDB
} = require ("../../../../services/user/sms")
const { client , connectRedis, disconnectRedis } = require("./../../../../loader/redis")


router.post ("/register", async (req, res, next) => {
    try {
        const result = await signupVal.validateAsync (req.body)
        const confelect = await doesExistphone(result.phone) === true
        if (confelect) {res.status(409).send("phone already exists")}
        result.password = await hashPassword(result.password)
        await creatUser(result)
        const phone = result.phone
        const code = getRandomInt()
        await sendSMS(code, phone)
        await saveCodeInDB(code, phone)
        res.send("regester successful")
    } catch (error) {
        console.log(error)
        if (error.Conflict === true) error.status = 400
        if (error.isJoi === true) error.status = 422
        next(createError(500, "An unexpected error occurred while registering"));
    }
})
router.post ("/sendforgetpass", async (req, res, next) => {
    try {
        const result = await resetpassval.validateAsync (req.body)
        const phonen = result.phone
        const code = getRandomInt()
        await sendSMS(code, phonen)
        await saveCodeInDB(code, phonen)
        res.send("code has been sended successful")
    } catch (error) {
        console.log(error)
        if (error.isJoi === true) error.status = 422
        next(createError(500, "An unexpected error occurred while registering"));
    }
})
router.post ("/setnewpass", async (req, res, next) => {
    try {
        let result = await resetpassval.validateAsync(req.body)
        const new_pass = result.password
        const phone = result.phone
        const code = result.code
        result.password = await hashPassword(new_pass)
        const status = await CheckIfCorrect(code, phone)
        if (status == 1) {
            const update = await resetpass(phone, result.password)
        } if ( status == 2 ){
            res.status(400).send("code is not true")
        } if ( status == 3) {
            res.status(403).send("code expired")
        }
    res.send("password has been changed successfully ")
    } catch (error) {
        console.log(error)
        if (error.Conflict === true) error.status = 400
        if (error.isJoi === true) error.status = 422
        next(createError(500, "An unexpected error occurred while registering"));
    }
})
router.post ("/verify", async (req, res, next) => {
    try {
        let result = await codephone.validateAsync (req.body)
        const phone = result.phone
        const code = result.code
        const status = await CheckIfCorrect(code, phone)
        if (status == 1) {
            userPhoneVarify(phone)
            res.status(200).send("phone has been varifyed")
        } if ( status == 2 ){
            res.status(400).send("code is not true")
        } if ( status == 3) {
            res.status(403).send("code expired")
        }        
    } catch (error) {
        next(createError(500, "An unexpected error occurred while varifying"));
    }
    })
router.post ("/newcode", async (req, res, next) => {
    try {
        const result = await phone.validateAsync(req.body)
        const number = result.phone
        const code = getRandomInt()
        await generateNewCodeForThisNumber(code, number)
        res.send("ok")        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/login", async (req, res, next) => {
    try {
        const result = await loginVal.validateAsync(req.body) 
        const user = await getUserByPhone(result.phone)
        if (!user) {res.status(404).send("user not found")}
        if (user.phoneVarify === false) {
            res.status(401).send("phone not varify")
        }
        else {
            console.log(result.password, user.password)
        const compare = await isValid(result.password, user.password)
        if (!user) throw createError.NotFound("user is not regesterd")
        console.log(compare)
        if (compare === true ) {
            const name = user.full_name
            const phone = user.phone
            const role  = user.admin
            const refreshToken = await signRefreshToken(user.phone)
            const AccessToken = await signAccessToken(user.phone)
            res.send({refreshToken, AccessToken, name, phone, role })
        }
        else {
            res.status(403).send("user or password is incorecet")
            }
        }       
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        if (error.isJoi === true) return next(createError.BadRequest("username or password is invalid"))
        next(createError(500, "An unexpected error occurred"));
    }
})

router.put ("/updateuser",verifyAccessToken, async (req, res, next) => {
    try {
        const result = await updateVal.validateAsync(req.body)
        if (!req.headers["authorization"]) next (createErrors.Unauthorized())
        const authheader = req.headers["authorization"]
        const bearertoken = authheader.split(' ')
        const token = bearertoken[1]
        let phone = await getUserByAccessToken(token)
        const update = await updateUser(phone, result)
        res.send("user has been updated")
    } catch (error) {
        console.log(error)
        next(createError(500, "An unexpected error occurred"));
    }

})

router.delete("/logout", async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return next(createError.BadRequest("Refresh token is required!"));
    }
    try {
        console.log("Received refresh token:", refreshToken);
        const phone = await verifyRefreshToken(refreshToken);
        console.log("Phone retrieved from token verification:", phone);
        await connectRedis()
        console.log("Connected to Redis for logout.");
        console.log(phone)
        const result = await client.del(phone);
        if (result === 0) {
            console.warn("Token not found or already deleted in Redis for phone:", phone);
            return next(createError.NotFound("Refresh token not found or already deleted."));
        }
        await disconnectRedis();
        console.log("Disconnected from Redis after logout.");
        // Respond with 204 No Content on successful deletion
        res.sendStatus(204);

    } catch (error) {
        console.error("Error during logout process:", error);
        return next(createError.InternalServerError("An unexpected error occurred during logout"));
    }
});


router.get("/getAnnouncements", verifyAccessToken ,async (req, res, next)=> {
    try {
        if (!req.headers["authorization"]) next (createErrors.Unauthorized())
            const authheader = req.headers["authorization"]
            const bearertoken = authheader.split(' ')
            const token = bearertoken[1]
            let phone = await getUserByAccessToken(token)
        const Announces = await getUserAnnounce(phone)
        res.send(Announces)
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})




module.exports = router