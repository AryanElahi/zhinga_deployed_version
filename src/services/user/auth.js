const express = require("express")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const creatErrors = require ("http-errors")
const { client, connectRedis, disconnectRedis } = require("./../../loader/redis")

async function doesExistphone(phone) {
const Exist = await prisma.user.findUnique({
    where: {
        phone: phone
    }
    })
    console.log (Exist)
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
async function isValid(pass, dpass){
    try {
        bcrypt.compare(pass, dpass ,(err, data) => {
            if (err) throw err
            if (data) {
                return  (true)
            }
            if (!data) return  (false)
        })
    } catch (error) {
        throw error
    }
}
async function updateUser (phone, result){
  try {
    const updated = await prisma.user.update({
    where: {phone: phone},
    data : result
    })
  return (updated)
  } catch (error) {
    if (error) return(error)
  }

}
async function getUserByAccessToken (AccessToken){
  return new Promise((resolve, reject) => {
    const spliter = AccessToken.split(' ')
    const token = spliter[1]
    JWT.verify(token, "sdljkdlkjasdlkdjsalkdjsakldsajklajsd" , (err, payload) => {
      if (err) {
        reject(creatErrors.InternalServerError())
        return
      }
      const phone = payload.aud.toString()
      resolve (phone)
    })
  })
}
async function softDelete (phone) {
  
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
    signRefreshToken: (phone) => {
      return new Promise((resolve, reject) => {
        const payload = {};
        const secret = "80a3236d80c07f007bc56c5c30598a9ea4876f7bab2e69cc777e22f96ccead6a";
        const options = {
          expiresIn: '10 s',
          issuer: 'pickurpage.com',
          audience: phone,
        };
    
        JWT.sign(payload, secret, options, async (err, token) => {
          if (err) {
            console.log(err.message);
            return reject(creatError.InternalServerError());
          }
          try {
            await connectRedis();
            await client.set(phone, token, {
              EX: 10 ,
            });
            resolve(token);
          } catch (err) {
            console.error('Error:', err);
            reject(creatError.InternalServerError());
          } finally {
            await disconnectRedis();
          }
        });
      });
    },
    signAccessToken: (phone) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = "sdljkdlkjasdlkdjsalkdjsakldsajklajsd"
          const options = {
            expiresIn: '1y',
            issuer: 'pickurpage.com',
            audience: phone,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(creatError.InternalServerError())
              return
            }
            resolve(token)
          })
        })
      },
    userPhoneVarify
}