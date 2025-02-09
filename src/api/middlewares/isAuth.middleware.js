const JWT = require("jsonwebtoken")
const createError = require("http-errors")
const { process } = require("@hapi/joi/lib/errors")
const env = require("dotenv")
const { reject } = require("bcrypt/promises")
const { client, connectRedis, disconnectRedis } = require("./../../loader/redis")
const {getUserByAccessToken, getUserByPhone} = require("../../services/user/auth")
const { HttpStatusCode } = require("axios")


module.exports = {
    verifyAccessToken: (req, res, next) => {
        if (!req.headers["authorization"]) next (createError.Unauthorized())
        const authheader = req.headers["authorization"]
        const bearertoken = authheader.split(' ')
        const token = bearertoken[1]
        JWT.verify(token, "5b29b663001ba6bd03417dd8392d405a26a770b84b335628044b31ade046"
          , (err, payload) => {
            if (err) {return next (createError.Unauthorized())}
            req.payload = payload
            next()
        })
    },
    verifyadmin: async (req, res, next) => {
      if (!req.headers["authorization"]) next (createError.Unauthorized())
        const authheader = req.headers["authorization"]
        const bearertoken = authheader.split(' ')
        const token = bearertoken[1]
        const userId = await getUserByAccessToken(token)
        const user = await getUserByPhone(userId)
        if (user.admin === true) {
          next();  
      } else {
          return res.status(403).json({ message: 'Access denied: Admins only' });
      }
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      // Verify the JWT token
      JWT.verify(refreshToken, "80a3236d80c07f007bc56c5c30598a9ea4876f7bab2e69cc777e22f96ccead6a" , async (err, payload) => {
        if (err) {
          console.error('JWT Verification Error:', err);  // Debugging log for JWT errors
          if (err.name === 'TokenExpiredError') {
            return reject(createError.Unauthorized('Refresh token expired'));
          } else {
            return reject(createError.Unauthorized('Invalid refresh token'));
          }
        }
  
        const phone = payload.aud;  
        try {
          // Connect to Redis
          await connectRedis();  
          // Attempt to retrieve the stored token associated with the phone
          const storedToken = await client.get(phone);  
          // Check if the stored token matches the provided refresh token
          if (!storedToken) {
            console.error('Stored token not found in Redis for phone:', phone);
            return reject(createError.Unauthorized('Token not found'));
          }
          if (storedToken !== refreshToken) {
            console.error('Token mismatch: provided token does not match stored token');
            return reject(createError.Unauthorized('Token mismatch'));
          }
          await disconnectRedis();
          resolve(phone);
        } catch (redisErr) {
          console.error('Redis operation error:', redisErr);  // Log Redis-specific error
          reject(createError.InternalServerError('Redis error occurred'));
        }
      });
    });
  }, 
  }