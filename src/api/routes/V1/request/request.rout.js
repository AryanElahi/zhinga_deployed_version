const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const {request} = require("../../../../validation/request.validation")
const {verifyAccessToken, verifyadmin} = require("../../../middlewares/isAuth.middleware")
const { 
    creatRequest,
    getByUid, 
    getAll,
    getchecked,
    getunchecked,
    check
} = require("../../../../services/request/services")

router.post("/creatrequest", async (req, res, next) => {
    try {
        let result = await request.validateAsync(req.body) 
        console.log("aksljd") 
        result.Uid = String(new Date().getTime()) 
        const  newA = await creatRequest(result)
        res.send("request has been recived")        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.get("/getAll",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        res.send(await getAll())
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.get("/getchecked",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        res.send(await getchecked())        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.get("/getunchecked",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        res.send(await getunchecked())        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/getbyUid",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const Uid = req.body.Uid
        res.send(await getByUid(Uid))        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.put("/check",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        res.send (await check(req.body.Uid))        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }

})

module.exports = router