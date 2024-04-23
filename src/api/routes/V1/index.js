const express = require("express")
const authUserV1 = require ("./user/auth.rout")

const v1Loader = () => {
    const router = express.Router();
    router.use("/auth", authUserV1)
    return router;
}
module.exports = v1Loader;