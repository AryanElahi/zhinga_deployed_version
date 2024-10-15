const JWT = require("jsonwebtoken")
const creatError = require("http-errors")
const { process } = require("@hapi/joi/lib/errors")
const env = require("dotenv")
const { reject } = require("bcrypt/promises")
const { client, connectRedis, disconnectRedis } = require("./../../loader/redis")

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
          JWT.verify(refreshToken, "80a3236d80c07f007bc56c5c30598a9ea4876f7bab2e69cc777e22f96ccead6a", async (err, payload) => {
            if (err) {
              if (err.name === 'TokenExpiredError') {
                return reject(creatError.Unauthorized('Refresh token expired'));
              } else {
                return reject(creatError.Unauthorized('Invalid refresh token'));
              }
            }
      
            const phone = payload.aud;
      
            try {
              await connectRedis();
      
              const storedToken = await client.get(phone);
      
              if (!storedToken || storedToken !== refreshToken) {
                return reject(creatError.Unauthorized('Token mismatch'));
              }
      
              resolve(phone);
            } catch (redisErr) {
              console.error('Redis error:', redisErr);
              reject(creatError.InternalServerError('Redis error occurred'));
            } finally {
              try {
                await disconnectRedis();
              } catch (disconnectErr) {
                console.error('Failed to disconnect Redis:', disconnectErr);
              }
            }
          });
        });
      },
    }