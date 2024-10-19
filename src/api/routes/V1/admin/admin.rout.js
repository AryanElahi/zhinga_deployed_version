const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {signupVal, loginVal} = require("../../../../validation/announce.crud.validation")
const {getAllUsers,updateUser} = require("../../../../services/user/auth")
const {
    getByUid,
    getAll,
    getchecked,
    getunchecked,
    check} = require("../../../../services/request/services")
const {
    getAllAnnouns, 
    inPrigressStates,
    deleted_or_not_confirmed,
    uncheckedRequests
} = require("../../../../services/adminpanel/services")
const {
    get_ip,
    get_exact_date,
    save_visitor,
    get_daily_visitors,
    get_all_visitors
}= require ("../../../../services/adminpanel/visitCountingServices")
const {verifyAccessToken, verifyRefreshToken} = require("../../../middlewares/isAuth.middleware")
const { not } = require("joi")
const {
    creatvisit,
    getAllVisits,
    updateVisits,
    deleteVisits
} = require("./../../../../services/adminpanel/visit/CRUD")
//Dashboard started
router.get("/dashboard", async (req, res, next) => {
try {
    const user = await getAllUsers()
    const announcount = await getAllAnnouns()
    console.log(announcount)
    const inprogress = await inPrigressStates()
    const notConfirmed = await deleted_or_not_confirmed()
    const uncheckedRequest = await uncheckedRequests()
    const allVisitors = await get_all_visitors()
    const dailyVisitors = await get_daily_visitors()
    res.send ({
        "all announcements" : announcount.number.toString(),
        "all users" : user.number.toString(), 
        "in progress ": inprogress.number.toString(),
        "deleted or not confirmed" : notConfirmed.number.toString(),
        "unchecked requests" : uncheckedRequest.number.toString(),
        "all visitors" : allVisitors.number.toString(),
        "daily visitors" : dailyVisitors.toString()
    })
} catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
}
})

router.get("/inprogress", async (req, res, next) => {
    const inprogress = await inPrigressStates()
    res.send(inprogress)
})

router.get("/notconfirmed", async (req, res, next) => {
    const notconfirmed = await deleted_or_not_confirmed()
    res.send(notconfirmed)
})
router.get("/getAllRequests", async (req, res, next) => {
    const requests = await getAll()
    res.send(requests)
})
router.post("/creatVisit", async(req, res, next) => {
    data = req.body
    data.Uid = new Date().getTime().toString()
    visit = await creatvisit(data)
    res.send(visit)
})
router.get("/getAllVisits", async (req, res, next) => {
    const visits = await getAllVisits()
    res.send(visits)
})
router.post("/updateVisits", async(req, res, next) => {
    ID = req.body.ID
    let requestData = req.body
    delete requestData.ID
    const data = requestData
    visit = await updateVisits(ID ,data)
    res.send(visit)
})













module.exports = router






router.get("/alluseres", async (req, res, next) => {
    try {
        res.send (await getAllUsers())
    } catch (error) {
        next(error)
    }
})