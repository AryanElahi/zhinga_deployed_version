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

router.post("/creatAnnounce", upload.array('images', 10), async (req, res, next) => {
    try {
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `${process.env.SERVER_URL}/profile/${file.filename}`);
        }
        let result = await creat.validateAsync(req.body);
        const authheader = req.headers["authorization"];
        const bearertoken = authheader.split(' ');
        const token = bearertoken[1];
        const userId = await getUserByAccessToken(token);
        result.Uid = String(new Date().getTime());
        if (imageUrls.length > 0) {
            result.images = imageUrls.join(','); 
        }
        console.log(result);
        const newA = await creatAnnouncement(result, userId); 
        res.send({
            success: 1,
            data: newA,
            images: imageUrls 
        });
    } catch (error) {
        res.status(500).send({
            success: 0,
            message: error.message
        });
    }
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
router.put("/sdelete", async (req, res) => {
    const Uid = req.body.Uid
    res.send (await softdeleteAnnoun(Uid))
})
router.delete("/hdelete", async (req, res, next) => {
    const Uid = req.body.Uid
    res.send (await deleteAnnoun(Uid))
})

module.exports = router