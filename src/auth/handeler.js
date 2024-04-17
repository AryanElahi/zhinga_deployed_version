const JWT = require("jsonwebtoken")
const creatError = require("http-errors")
const { process } = require("@hapi/joi/lib/errors")
const env = require("dotenv")


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = "sdljkdlkjasdlkdjsalkdjsakldsajklajsd"
          const options = {
            expiresIn: '1h',
            issuer: 'pickurpage.com',
            audience: userId,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(createError.InternalServerError())
              return
            }
            console.log(token)
            resolve(token)
          })
        })
      },
    varifyAccessToken: (req, res, next) => {
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
    }
    }