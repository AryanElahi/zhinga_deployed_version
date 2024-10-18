const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {creat, update} = require("../../../../validation/announce.crud.validation")
const { 
    creatAnnouncement,
    getByStateCode,
    getAllAnnouns,
    getByUid,
    updateAnnoun,
    softdeleteAnnoun,
    deleteAnnoun,
} = require("../../../../services/anouncement/CRUD")
const {getUserByAccessToken} = require ("./../../../../services/user/auth")

router.post ("/creatAnnounce", async (req, res, next) => {
    let result = await creat.validateAsync(req.body)
    const authheader = req.headers["authorization"]
    const bearertoken = authheader.split(' ')
    console.log(bearertoken)
    const token = bearertoken[1]
    console.log(token)
    const userId = await getUserByAccessToken(token)
    result.Uid = String(new Date().getTime()) 
    console.log (result)
    const  newA = await creatAnnouncement(result, userId)
    res.send (newA)
})
router.post("/getbystatecode", async (req, res, next) => {
    const state = req.body.state_code
    res.send(await getByStateCode(state))
})
router.get("/getallannounce", async (req, res, next) => {
    res.send(await getAllAnnouns())
})
router.post("/getbyUid", async (req, res, next) => {
    const Uid = req.body.Uid
    res.send(await getByUid(Uid))
})
router.put("/updateannoun", async (req, res) => {
    let result = await update.validateAsync(req.body)
    res.send (await updateAnnoun(result))
})
router.put("/sdelete", async (req, res) => {
    const Uid = req.body.Uid
    res.send (await softdeleteAnnoun(Uid))
})
router.delete("/hdelete", async (req, res, next) => {
    const Uid = req.body.Uid
    res.send (await deleteAnnoun(Uid))
})

module.exports = router