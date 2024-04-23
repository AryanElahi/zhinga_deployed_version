const JWT = require("jsonwebtoken")
const creatError = require("http-errors")
const { process } = require("@hapi/joi/lib/errors")
const env = require("dotenv")
const { reject } = require("bcrypt/promises")

module.exports = {
    verifyAccessToken: (req, res, next) => {
        console.log(req.headers)
        if (!req.headers["authorization"]) next (creatError.Unauthorized())
        const authheader = req.headers["authorization"]
        const bearertoken = authheader.split(' ')
        console.log(bearertoken)
        const token = bearertoken[1]
        JWT.verify(token, "sdljkdlkjasdlkdjsalkdjsakldsajklajsd" , (err, payload) => {
            if (err) {return next (creatError.Unauthorized())}
            req.payload = payload
            next()
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken,"80a3236d80c07f007bc56c5c30598a9ea4876f7bab2e69cc777e22f96ccead6a", (err, payload) =>{
                if (err)  reject (creatError.Unauthorized())
                const phone = payload.aud
                resolve (phone)

            })
        })
    }
    }