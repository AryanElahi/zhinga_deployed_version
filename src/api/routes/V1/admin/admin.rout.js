const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const upload = require('./../../../middlewares/photoUploading'); 
const {signupVal, loginVal} = require("../../../../validation/announce.crud.validation")
const {getAllUsers,updateUser} = require("../../../../services/user/auth")
const {
    getAll,
    getunchecked} = require("../../../../services/request/services")
const {
    creatannounce,
    getAllAnnouns,
    inPrigressStates,
    deleted_or_not_confirmed,
    search,
    photo_adding,
    checkAnnounce,
    rejectAnnoun
} = require("../../../../services/adminpanel/adminannounce/announservices")
const {
    get_daily_visitors,
    get_all_visitors
}= require ("../../../../services/adminpanel/visitCountingServices")
const {verifyAccessToken, verifyRefreshToken, verifyadmin} = require("../../../middlewares/isAuth.middleware")
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
const {
    getAllsliders,
    deleteslider,
    updateslider,
    creatslider,
    photo_adding_slider
} = require("./../../../../services/sliders/CRUD")
const { initiateSetting, logoAdding, aboutUpdating } = require("../../../../services/setting/services")
const {
    creatteam,
    getAllteam,
    updateteam,
    deleteteam
} = require("./../../../../services/setting/teamCRUD")
//Dashboard started
router.get("/dashboard", async (req, res, next) => {
try {
    const user = await getAllUsers()
    const announcount = await getAllAnnouns()
    const inprogress = await inPrigressStates()
    const notConfirmed = await deleted_or_not_confirmed()
    const uncheckedRequests = await getunchecked()
    const allVisitors = await get_all_visitors()
    const dailyVisitors = await get_daily_visitors()
    res.send ({
        "all announcements" : announcount.number.toString(),
        "all users" : user.number.toString(), 
        "in progress ": inprogress.number.toString(),
        "deleted or not confirmed" : notConfirmed.number.toString(),
        "unchecked requests" : uncheckedRequests.number.toString(),
        "all visitors" : allVisitors.number.toString(),
        "daily visitors" : dailyVisitors.toString()
    })
} catch (error) {
    if (error.isJoi === true) error.status = 422
    next(createError(500, "An unexpected error occurred"));
}
})
router.get("/notconfirmed", async (req, res, next) => {
    try {
        const notconfirmed = await deleted_or_not_confirmed()
        res.send(notconfirmed)    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.get("/getAllRequests", async (req, res, next) => {
    try {
    const requests = await getAll()
    res.send(requests)
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
//announcement management
router.post("/creatAnnouncement", verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
    let result = await creatval.validateAsync(req.body)
    result.check = true
    result.Uid = String(new Date().getTime()) 
    const authheader = req.headers["authorization"]
    const bearertoken = authheader.split(' ')
    const token = bearertoken[1]
    const userId = await getUserByAccessToken(token)
    const newA = await creatannounce(result, userId)
    res.send (newA)
    }
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.post("/uploadPhotos", verifyAccessToken, verifyadmin , async (req, res, next) => {
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
            } 
            catch (error) {
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
router.get("/inprogress",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const inprogress = await inPrigressStates()
        res.send(inprogress)
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.get("/notconfirmed",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const notconfirmed = await deleted_or_not_confirmed()
        res.send(notconfirmed)
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.post("/search",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const result = await search(req.body)
        res.send(result)
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});

router.post("/varifyannounce",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
    const ID = req.body.Uid
    const state  = req.body.state
    const result = await checkAnnounce(ID, state)
    res.send(result) 
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.post("/rejectannounce",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const ID = req.body.Uid
        const result = await rejectAnnoun(ID)
        res.send(result) 
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
//visit part
router.post("/creatVisit",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        data = req.body
        data.Uid = new Date().getTime().toString()
        visit = await creatvisit(data)
        res.send(visit)
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.get("/getAllVisits",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
    const visits = await getAllVisits()
    res.send(visits)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.post("/updateVisits",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        ID = req.body.ID
        let requestData = req.body
        delete requestData.ID
        const data = requestData
        visit = await updateVisits(ID ,data)
        res.send(visit)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
router.post("/deleteVisit",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        ID = req.body.ID
        const del = deleteVisits(ID)
        res.send(await getAllVisits())        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
});
//deal part
router.post("/creatdeal",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        data = req.body
        data.Uid = new Date().getTime().toString()
        deal = await creatdeal(data)
        res.send(deal)        
    } 
    catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.get("/getAlldeals",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const deals = await getAlldeals()
        res.send(deals)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/updatedeal",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        ID = req.body.ID
        let requestData = req.body
        delete requestData.ID
        const data = requestData
        deal = await updatedeal(ID, data)
        res.send(deal)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/deletedeal",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        ID = req.body.ID
        const del = deletedeal(ID)
        res.send(await getAlldeals())        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
//user management
router.get("/alluseres",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        res.send (await getAllUsers())
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.put("/updateuser",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        let result = req.body
        let phone = req.phone
        res.send(await updateUser(phone, result))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.put("/promotToAdmin",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const phone = req.body.phone
        const PA = await promotToAdmin(phone)
        res.send(PA)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
//slider management
router.post("/creatslider",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        data = req.body
        slider = await creatslider(data)
        res.send(slider)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/uploadsliderPhotos",verifyAccessToken, verifyadmin , async (req, res, next) => {
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
            const adding = await photo_adding_slider(req.body.id , imageUrls)
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
router.get("/getAllSliders",verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        const slider = await getAllsliders()
        res.send(slider)
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/updateslider",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        let result = req.body
        const id = req.body.id
        res.send( await updateslider(id, result))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.delete("/deleteslider",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const id = req.body.id
        res.send( await deleteslider(id))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
//site setting
router.post("/initiateSetting",verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        res.send (await initiateSetting(req.body))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/uploadLogo",verifyAccessToken, verifyadmin , async (req, res, next) => {
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
            const adding = await logoAdding(imageUrls)
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
router.post("/aboutUpdating",verifyAccessToken, verifyadmin , async (req, res, next ) => {
    try {
        const updated = await aboutUpdating(req.body)
        res.send (updated)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
//team
router.post("/creatteam" ,verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        data = req.body
        team = await creatteam(data)
        res.send(team)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.get("/getAllteam" ,verifyAccessToken, verifyadmin , async(req, res, next) => {
    try {
        const team = await getAllteam()
        res.send(team)        
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.post("/updateteam" ,verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        let result = req.body
        const id = req.body.id
        res.send( await updateteam(id, result))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
router.delete("/deleteteam" ,verifyAccessToken, verifyadmin , async (req, res, next) => {
    try {
        const id = req.body.id
        res.send(await deleteteam(id))
    } catch (error) {
        next(createError(500, "An unexpected error occurred"));
    }
})
module.exports = router

