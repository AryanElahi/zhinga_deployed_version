const express = require("express")
const router = express.Router()
const creatErrors = require("http-errors")
const {creat, update} = require("../../../../validation/announce.crud.validation")
const { 
    creatAnnouncement,
    getByStateCode,
    getAllAnnouns,
    getAnnounBytype,
    getAnnounByregion,
    getAnnounByAddress,
    getAnnounBydocument_type,
    getAnnounByland_metrage,
    updateAnnoun,
    deleteAnnoun,
    getByUid
} = require("../../../../services/anouncement/CRUD")


router.post ("/creatAnnounce", async (req, res, next) => {
    let result = await creat.validateAsync(req.body)  
    result.Uid = String(new Date().getTime()) 
    console.log (result)
    const  newA = await creatAnnouncement(result)
    res.send (newA)
})
router.post("/getbystatecode", async (req, res, next) => {
    console.log(req.body.state_code)
    res.send(await getByStateCode(req.body.state_code))
})

router.get("/getallannounce", async (req, res, next) => {
    res.send(await getAllAnnouns())
})

router.put ("/updateannoun", async (req, res) => {
    let result = await update.validateAsync(req.body)
    res.send (await updateAnnoun(result))

})
router.delete("/logout", async (req, res, next) => {
    res.send("logout")
})

module.exports = router