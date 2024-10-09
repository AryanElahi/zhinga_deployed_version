const cli = require("nodemon/lib/cli");
const expressLoader = require("./express")
const { client, connectRedis, disconnectRedis } = require('./redis');

const loader = async (app) => { 
    (async () => {
        try {
            // اتصال به Redis
            await connectRedis();
    
            // استفاده از کلاینت Redis
            await client.set('foo', 'bar');
            const value = await client.get('foo');
            console.log(value);  // خروجی: 'bar'
    
        } catch (err) {
            console.error('Error:', err);
        } finally {
            // بستن اتصال Redis
            await disconnectRedis();
        }
    })();
}



module.exports = loader;