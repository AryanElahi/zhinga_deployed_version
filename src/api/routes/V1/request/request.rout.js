const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {request} = require("../../../../validation/request.validation")
const { 
    creatRequest,
    getByUid, 
    getAll,
    getchecked,
    getunchecked,
    check
} = require("../../../../services/request/services")

router.post ("/creatrequest", async (req, res, next) => {
    let result = await request.validateAsync(req.body)  
    result.Uid = String(new Date().getTime()) 
    console.log (result)
    const  newA = await creatRequest(result)
    res.send (newA)
})
router.get("/getAll", async (req, res, next) => {
    res.send(await getAll())
})
router.get("/getchecked", async (req, res, next) => {
    res.send(await getchecked())
})
router.get("/getunchecked", async (req, res, next) => {
    res.send(await getunchecked())
})
router.post("/getbyUid", async (req, res, next) => {
    const Uid = req.body.Uid
    res.send(await getByUid(Uid))
})
router.put("/check", async (req, res) => {
    res.send (await check(req.body.Uid))
})

module.exports = router