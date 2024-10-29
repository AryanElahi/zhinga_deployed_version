const express = require("express")
const router = express.Router()
const upload = require('./../../../middlewares/photoUploading'); 
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
    creatannounce,
    getAllAnnouns,
    inPrigressStates,
    deleted_or_not_confirmed,
    search,
    photo_adding,
    checkAnnounce
} = require("../../../../services/adminpanel/adminannounce/announservices")
const {
    get_daily_visitors,
    get_all_visitors
}= require ("../../../../services/adminpanel/visitCountingServices")
const {verifyAccessToken, verifyRefreshToken} = require("../../../middlewares/isAuth.middleware")
const {
    creatvisit,
    getAllVisits,
    updateVisits,
    deleteVisits
} = require("./../../../../services/adminpanel/visit/CRUD")
const {
    creatdeal,
    getAlldeals,
    updatedeal,
    deletedeal
} = require("./../../../../services/adminpanel/deal/CRUD")
const {
    promotToAdmin,
} = require("./../../../../services/adminpanel/userManagement/services")
const {creatval} = require("./../../../../validation/adminval")
const {getUserByAccessToken} = require("../../../../services/user/auth")

//Dashboard started
router.get("/dashboard", async (req, res, next) => {
try {
    const user = await getAllUsers()
    const announcount = await getAllAnnouns()
    const inprogress = await inPrigressStates()
    //const notConfirmed = await deleted_or_not_confirmed()
    const uncheckedRequests = await getunchecked()
    const allVisitors = await get_all_visitors()
    const dailyVisitors = await get_daily_visitors()
    res.send ({
        "all announcements" : announcount.number.toString(),
        "all users" : user.number.toString(), 
        "in progress ": inprogress.number.toString(),
        //"deleted or not confirmed" : notConfirmed.number.toString(),
        "unchecked requests" : uncheckedRequests.number.toString(),
        "all visitors" : allVisitors.number.toString(),
        "daily visitors" : dailyVisitors.toString()
    })
} catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
}
})

router.get("/notconfirmed", async (req, res, next) => {
    const notconfirmed = await deleted_or_not_confirmed()
    res.send(notconfirmed)
})
router.get("/getAllRequests", async (req, res, next) => {
    const requests = await getAll()
    res.send(requests)
})
//announcement management
router.post("/creatAnnouncement", async(req, res, next) => {
    let result = await creatval.validateAsync(req.body)
    result.check = true
    result.Uid = String(new Date().getTime()) 
    console.log (result)
    const authheader = req.headers["authorization"]
    const bearertoken = authheader.split(' ')
    console.log(bearertoken)
    const token = bearertoken[1]
    console.log(token)
    const userId = await getUserByAccessToken(token)
    const  newA = await creatannounce(result, userId)
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

router.get("/inprogress", async (req, res, next) => {
    const inprogress = await inPrigressStates()
    res.send(inprogress)
})
router.get("/notconfirmed", async (req, res, next) => {
    const notconfirmed = await deleted_or_not_confirmed()
    res.send(notconfirmed)
})
router.post("/search", async (req, res, next) => {
    console.log(req.body)
    const result = await search(req.body)
    res.send(result)
})
router.post("/varifyannounce", async (req, res, next) => {
    const ID = req.body.Uid
    const result = await checkAnnounce(ID)
    res.send(result)
})
//visit part
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
router.post("/deleteVisit", async(req, res, next) => {
    ID = req.body.ID
    const del = deleteVisits(ID)
    res.send(await getAllVisits())
})
//deal part
router.post("/creatdeal", async(req, res, next) => {
    data = req.body
    data.Uid = new Date().getTime().toString()
    deal = await creatdeal(data)
    res.send(deal)
})
router.get("/getAlldeals", async (req, res, next) => {
    const deals = await getAlldeals()
    res.send(deals)
})
router.post("/updatedeal", async(req, res, next) => {
    ID = req.body.ID
    let requestData = req.body
    delete requestData.ID
    const data = requestData
    deal = await updatedeal(ID, data)
    res.send(deal)
})
router.post("/deletedeal", async(req, res, next) => {
    ID = req.body.ID
    const del = deletedeal(ID)
    res.send(await getAlldeals())
})
//user management
router.get("/alluseres", async (req, res, next) => {
    try {
        res.send (await getAllUsers())
    } catch (error) {
        next(error)
    }
})
router.put("/updateuser", async (req, res) => {
    try {
        let result = req.body
        let phone = req.phone
        res.send(await updateUser(phone, result))
    } catch (error) {
        if (error) throw error
    }
})
router.put("/promotToAdmin", async (req, res, next) => {
    const phone = req.body.phone
    const PA = await promotToAdmin(phone)
    res.send(PA)
})

//site setting
router.post("/uploadPropertyLogos", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: 0,
                message: err.message
            });
        }
        if (!req.files || req.files.length === 0 || !req.files['propertylogos']) {
            return res.status(400).json({
                success: 0,
                message: 'هیچ فایلی با نام propertylogos آپلود نشد'
            });
        }
        const imageUrls = req.files['propertylogos'].map(file => `http://localhost:3000/photos/${file.filename}`);
        res.status(200).json({
            success: 1,
            message: "success",
            files: imageUrls
        });
    });
});
module.exports = router


