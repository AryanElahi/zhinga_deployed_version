const cli = require("nodemon/lib/cli");
const expressLoader = require("./express")
const { client, connectRedis, disconnectRedis } = require('./redis');

const loader = async (app) => { 
    await expressLoader(app);
}



module.exports = loader;