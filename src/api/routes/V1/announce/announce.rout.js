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
    deleteAnnoun,
    photo_adding
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
router.post("/uploadPhotos", async (req, res, next) => {
    upload(req, res, async (err) => { 
        if (err) {
            return res.status(400).json({
                success: 0,
                message: err.message
            });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: 0,
                message: 'file doesnt exist'
            });
        }
        const imageUrls = req.files.map(file => `http://localhost:3000/photos/${file.filename}`);
        try {
            const adding = await photo_adding(req.body.Uid, imageUrls)
            res.status(200).json({
                success: 1,
                message: "success",
                files: imageUrls
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: 0,
                message: "error while uploading"
            });
        }
    });

});
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
router.delete("/hdelete", async (req, res, next) => {
    const Uid = req.body.Uid
    res.send (await deleteAnnoun(Uid))
})

module.exports = router