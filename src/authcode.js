const express = require("express")
const morgan = require("morgan")
const creatErrors = require("http-errors")
const AuthRouts = require("./api/routes/V1/auth.rout")

require("dotenv").config()

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", async (req, res, next) => {
    res.send("hello world again")
})
app.use("/auth", AuthRouts)

app.use(async(req, res, next) => {
  //  const error = new Error('not found')
    //error.status = 404 
    //next (error)
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

const port = 3000

app.listen(port, () => {
   console.log ("server is runnng")
})