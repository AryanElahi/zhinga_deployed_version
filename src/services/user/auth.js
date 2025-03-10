const express = require("express")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt") 
const JWT = require("jsonwebtoken")
const createErrors = require ("http-errors")
const { client, connectRedis, disconnectRedis } = require("./../../loader/redis")
require("dotenv").config()

async function doesExistphone(phone) {
const Exist = await prisma.user.findUnique({
    where: {
        phone: phone
    }
    })
    if (Exist) return (true)
    if (!Exist) return (false)
}
async function hashPassword (pass) {
    const salt = await bcrypt.genSalt(10)
    let hashedpass = await bcrypt.hash(pass, salt)
    return (hashedpass)
}
async function creatUser (data){
    const newuser =await prisma.user.create({
        data :
            data           
    })
    return newuser
}
async function userPhoneVarify(phone) {
  await prisma.user.update({
  where: {phone: phone},
  data : {phoneVarify : true}
  })
}
async function getUserByPhone (phone){
    const user = await prisma.user.findUnique({
        where:  {
            phone : phone 
        }
    })
    return user
}
async function getAllUsers () {
    const user = await prisma.user.findMany()
    const counter = user.length
    return ({"users" : user, "number" : counter} )
}
async function isValid(pass, dpass) {
    try {
        // Return a promise that resolves with the result of bcrypt.compare
        const data = await new Promise((resolve, reject) => {
            bcrypt.compare(pass, dpass, (err, result) => {
                if (err) {
                    reject(err);  // Reject the promise if there's an error
                } else {
                    resolve(result);  // Resolve the promise with the comparison result
                }
            });
        });
        // Now you can return the boolean value based on the result of bcrypt.compare
        if (data === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

async function updateUser (phone, result){
  try {
    console.log(phone)
    const updated = await prisma.user.update({
    where: {phone: phone},
    data : result
    })
  return (updated)
  } catch (error) {
    if (error) return(error)
  }
}
async function resetpass (phone, new_pass){
  try {
    console.log(phone)
    const updated = await prisma.user.update({
    where: {phone: phone},
    data : {password : new_pass}
    })
  return (updated)
  } catch (error) {
    if (error) return(error)
  }
}
async function getUserByAccessToken(accessToken) {
  // Function to verify the access token and extract the user's phone number
  return new Promise((resolve, reject) => {
    JWT.verify(accessToken, "5b29b663001ba6bd03417dd8392d405a26a770b84b335628044b31ade046", (err, payload) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return reject(createErrors.InternalServerError("Invalid or expired access token"));
      }
      const phone = payload?.aud?.toString();
      if (!phone) {
        return reject(createErrors.BadRequest("Token payload does not contain a valid audience (phone number)"));
      }
      resolve(phone);
    });
  });
}
async function getUserAnnounce(phone) {
  const userAnnounces = await prisma.property.findMany(
    {where : {
      userID : phone
    }}
  )
  return userAnnounces
}
module.exports = {
    doesExistphone,
    hashPassword,
    creatUser,
    getUserByPhone,
    getAllUsers,
    isValid,
    updateUser,
    getUserByAccessToken,
    getUserAnnounce,
    signRefreshToken: (phone) => {
      return new Promise((resolve, reject) => {
        const payload = {};
        const secret = "80a3236d80c07f007bc56c5c30598a9ea4876f7bab2e69cc777e22f96ccead6a"     ;
        const options = {
          expiresIn: '1y',
          issuer: 'pickurpage.com',
          audience: phone,
        };
    
        JWT.sign(payload, secret, options, async (err, token) => {
          if (err) {
            return reject(createErrors.InternalServerError());
          }
          try {
            await connectRedis();
            await client.set(phone, token, {
              EX: 365 * 24 * 60 * 60,
            });
            resolve(token);
          } catch (err) {
            console.error('Error:', err);
            reject(createError.InternalServerError());
          } finally {
            await disconnectRedis();
          }
        });
      });
    },
    signAccessToken: (phone) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = "5b29b663001ba6bd03417dd8392d405a26a770b84b335628044b31ade046"
          const options = {
            expiresIn: '1y',
            issuer: 'pickurpage.com',
            audience: phone,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              reject(createErrors.InternalServerError())
              return
            }
            resolve(token)
          })
        })
      },
    userPhoneVarify,
    resetpass
}