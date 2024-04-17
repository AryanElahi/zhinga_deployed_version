const JWT = require("jsonwebtoken")
const creatError = require("http-errors")
const { process } = require("@hapi/joi/lib/errors")
const env = require("dotenv")
const { reject } = require("bcrypt/promises")


module.exports = {
    signAccessToken: (phone) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = "sdljkdlkjasdlkdjsalkdjsakldsajklajsd"
          const options = {
            expiresIn: '60s',
            issuer: 'pickurpage.com',
            audience: phone,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(creatError.InternalServerError())
              return
            }
            console.log(token)
            resolve(token)
          })
        })
      },
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
    signRefreshToken: (phone) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = "80a3236d80c07f007bc56c5c30598a9ea4876f7bab2e69cc777e22f96ccead6a"
          const options = {
            expiresIn: '1y',
            issuer: 'pickurpage.com',
            audience: phone,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(creatError.InternalServerError())
            }
            console.log(token)
            resolve(token)
          })
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