const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const {signupVal, loginVal, phone, codephone} = require("../../../../validation/user.auth.validation copy")
const {doesExistphone, hashPassword, signRefreshToken, creatUser, 
     getUserByPhone, isValid, signAccessToken, getUserByAccessToken, updateUser, userPhoneVarify, getUserAnnounce} = require("../../../../services/user/auth")
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
        if (await doesExistphone(result.phone) === true) throw createErrors.Conflict("phone already exists")
        result.password = await hashPassword(result.password)
        await creatUser(result)
        const phone = result.phone
        const code = getRandomInt()
        await sendSMS(code, phone)
        await saveCodeInDB(code, phone)
        res.send(await getUserByPhone(result.phone))
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post ("/varify", async (req, res, next) => {
    try {
        let result = await codephone.validateAsync (req.body)
        const phone = result.phone
        const code = result.code
        const status = await CheckIfCorrect(code, phone)
        if (status == 1) {
            userPhoneVarify(phone)
            res.send(await getUserByPhone(phone))
        } if ( status == 2 ){
            res.status(200).send("code is not true")
        } if ( status == 3) {
            res.status(200).send("code expired")
        }        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
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
        if (user.phoneVarify === false) {
            res.status(401).send("phone not varify")
        }
        else {
        const compare = await isValid(result.password, user.password)
        if (!user) throw createErrors.NotFound("user is not regesterd")
        if (compare === false) throw createErrors.Unauthorized("username or password is not correct")
        const refreshToken = await signRefreshToken(user.phone)
        const AccessToken = await signAccessToken(user.phone)
        res.send({refreshToken, AccessToken})
        }       
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        if (error.isJoi === true) return next(createError.BadRequest("username or password is invalid"))
        next(createError(500, "An unexpected error occurred"));
    }
})

router.delete ("/refreshToken", async (req, res, next) => {
    try {
        const {refreshToken} = req.body
        if (!refreshToken) throw createErrors.BadRequest()
        const phone = await verifyRefreshToken(refreshToken)
        const AccessToken = await signAccessToken(phone)
        const RefreshToken = await signRefreshToken(phone)
        res.send({AccessToken, RefreshToken})
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})

router.put ("/updateuser",verifyAccessToken, async (req, res, next) => {
    try {
        let result = await signupVal.validateAsync(req.body)
        if (!req.headers["authorization"]) next (createErrors.Unauthorized())
        const authheader = req.headers["authorization"]
        let phone = await getUserByAccessToken(authheader)
        res.send(await updateUser(phone, result))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }

})

router.delete ("/logout", async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw createErrors.BadRequest("Refresh token is required!");
        }
        const phone = await verifyRefreshToken(refreshToken);
        try {
            await connectRedis();
            const result = await client.del(phone)
            if (result === 0) {
                throw createErrors.NotFound("Refresh token not found or already deleted.");
            }
            await disconnectRedis();
            res.sendStatus(204);
        } catch (redisError) {
            console.error("Redis error:", redisError);
            return next(createError.InternalServerError("Redis connection or operation failed."));
        }
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});

router.post("/getAnnouncements", verifyAccessToken ,async (req, res, next)=> {
    try {
        const phone = await getUserByAccessToken (req.body.AccessToken)
        const Announces = await getUserAnnounce(phone)
        res.send(Announces)
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})




module.exports = router