const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

router.post("/register", async (req, res, next) => {
    //console.log(req.body)
try {
    const {fullname, username, password, countrycode, phone } = req.body
    if (!fullname || !username || !password || !countrycode || !phone) throw creatErrors.BadRequest()
    const doesExistphone = await prisma.user.findUnique({
    where: {
        phone: phone
    }
    })
    const doesExistusername = await prisma.user.findUnique({
        where: {
            phone: phone
        }
        })
    if (doesExistphone && doesExistusername) throw creatErrors.Conflict(" username or phone already exists")
    const newuser =await prisma.user.create({
        data : {
            full_name : fullname,
            username: username,
            password: password,
            countryCode: countrycode,
            phone: phone
        }
    })
    const getall = await prisma.user.findMany()
    res.send(getall)
} catch (error) {
    next(error)
}
})

router.post("/login", async (req, res, next) => {
    res.send("login")
})

router.post("/refreshToken", async (req, res, next) => {
    res.send("refresh token")
})

router.delete("/logout", async (req, res, next) => {
    res.send("logout")
})

module.exports = router