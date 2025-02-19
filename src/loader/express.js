const express = require("express");
const morgan = require("morgan");
const cors = require("cors");  // اضافه کردن cors
const createErrors = require("http-errors");
const routes = require("../api/routes");
require("dotenv").config();
const { save_visitor } = require("./../services/adminpanel/visitCountingServices");
const { errorHandler, notFoundHandler } = require("./../api/middlewares/errorHandeler");

const expressLoader = async (app) => {
    // تنظیمات CORS
    const corsOptions = {
        origin: 'http://your-frontend-url.com',  // آدرس فرانت‌اند خود را اینجا قرار بده
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // متدهای مجاز
        allowedHeaders: ['Content-Type', 'Authorization'],  // هدرهای مجاز
        credentials: true,  // اگر نیاز به ارسال کوکی یا اعتبار سنجی است
    };

    // اضافه کردن CORS به اپلیکیشن
    app.use(cors(corsOptions));

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

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
