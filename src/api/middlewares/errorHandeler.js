const createError = require("http-errors");

function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        success: 0,
        status: statusCode,
        message: err.message || "Internal Server Error",
    });
}

function notFoundHandler(req, res, next) {
    next(createError(404, "Resource not found"));
}

module.exports = {
    errorHandler,
    notFoundHandler
};
