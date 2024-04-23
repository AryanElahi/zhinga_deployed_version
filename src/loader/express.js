const express = require("express")
const morgan = require("morgan")
const creatErrors = require("http-errors")
const routes = require("../api/routes")
const {verifyAccessToken} = require ("../auth/handeler")
require("dotenv").config()

const expressLoader = async (app) => {
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.get("/", async (req, res, next) => {
        res.send("hello world again")
    })
    app.use("/auth", routes())
    //app.use("/auth", AuthRouts)
    app.use(async(req, res, next) => {
        next(creatErrors.NotFound())
        })
    app.use( async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        erorr :{
            status : err.status || 500,
            message: err.message,
        }
    })
})
//port = process.env.PORT
//console.log (port)
app.listen(process.env.PORT, () => {
   console.log ("server is runnng on port ", process.env.PORT)
})
}

module.exports = expressLoader;