require("dotenv").config()

const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_HOST
});

client.on('error', (err) => {
    console.log('Redis Client Error', err);
});

const connectRedis = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log("redis has been connected")
    }
};

const disconnectRedis = async () => {
    if (client.isOpen) {
        await client.quit();
    }
};

module.exports = {
    client,
    connectRedis,
    disconnectRedis
};
