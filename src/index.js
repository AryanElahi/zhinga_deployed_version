const express = require("express")
const loader = require("./loader/index")

const app = new express();

async function startServer(){
    await loader(app)
}

startServer();