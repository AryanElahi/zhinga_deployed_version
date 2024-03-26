const jwt = require("jsonwebtoken")
const creatError = require("http-errors")


module.exports = {
    signAccessToken: (userId) => {
        console.log(userId)
        return new Promise((resolve, reject ) => {
            const payload = {
                aud : userId,
                iss : "www.zhinga.ir"
            }
            const secret = "will be fulled"
            const option = {
                expiresIn : "1h",
            }
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) reject (err)
                console.log(token)
                resolve (token)
            })

            })
        }
    }
