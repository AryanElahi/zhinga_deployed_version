const jwt = require("jsonwebtoken")
const creatError = require("http-errors")
const { process } = require("@hapi/joi/lib/errors")
const env = require("dotenv")


module.exports = {
    signAccessToken: (userId) => {
        console.log(userId)
        return new Promise((resolve, reject ) => {
            const payload = {
                aud : userId,
                iss : "www.zhinga.ir"
            }
            const secret = "5b29b663001ba6bd03a27b417dd8392d405a26a770b84b335628044b31ade046"
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
