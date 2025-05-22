const express = require("express");
const morgan = require("morgan");
const cors = require("cors");  // اضافه کردن cors
const createErrors = require("http-errors");
const routes = require("../api/routes");
require("dotenv").config();
const { save_visitor } = require("./../services/adminpanel/visitCountingServices");
const { errorHandler, notFoundHandler } = require("./../api/middlewares/errorHandeler");
const path = require('path');

const expressLoader = async (app) => {
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const photosPath = '/var/www/backend/zhinga_deployed_version/src/photos';
    app.use('/photos', express.static(photosPath));
    app.get("/", async (req, res, next) => {
        await save_visitor(req);
        res.send("Home Rout");
    });

    app.use("/api", routes());
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });
};

module.exports = expressLoader;
   