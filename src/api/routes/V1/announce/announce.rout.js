const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const {creat, update} = require("../../../../validation/announce.crud.validation")
const { 
    creatAnnouncement,
    getByStateCode,
    getAllAnnouns,
    getByUid,
    updateAnnoun,
    deleteAnnoun,
    photo_adding,
    search
} = require("../../../../services/anouncement/CRUD")
const {getUserByAccessToken} = require ("./../../../../services/user/auth")
const {verifyAccessToken} = require("../../../middlewares/isAuth.middleware")

router.post ("/creatAnnounce", verifyAccessToken , async (req, res, next) => {
    try {
        let result = await creat.validateAsync(req.body)
        const authheader = req.headers["authorization"]
        const bearertoken = authheader.split(' ')
        const token = bearertoken[1]
        const userId = await getUserByAccessToken(token)
        result.Uid = String(new Date().getTime()) 
        const  newA = await creatAnnouncement(result, userId)
        res.send ("announcement has been created")        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/uploadPhotos",verifyAccessToken , async (req, res, next) => {
    try {
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
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.get("/getallannounce",verifyAccessToken , async (req, res, next) => {
    try {
        res.send(await getAllAnnouns())        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.put("/updateannoun",verifyAccessToken , async (req, res, next) => {
    try {
        let result = await update.validateAsync(req.body)
        res.send (await updateAnnoun(result))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }

})
router.post("/search" ,verifyAccessToken , async (req, res, next) => {
    try {
        const result = await search(req.body)
        res.send(result)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.delete("/hdelete",verifyAccessToken , async (req, res, next) => {
    try {
        const Uid = req.body.Uid
        res.send (await deleteAnnoun(Uid))        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})

module.exports = router


