const rp = require('request-promise');
const redis = require('redis');
const config = require('../config')

const SERVICE_ADDRESS = process.env["SERVICE_HOST"] || "3.229.135.170";
const SERVICE_PORT = process.env["SERVICE_PORT"] || "80";

exports.getData = (req, res) => {
    try {
        config.redisClient.get('data', async function(err, object) {
            if (object === null)
            {
                console.log("Port : " + SERVICE_PORT);
                const server_data = await rp({ uri: `http://${SERVICE_ADDRESS}:${SERVICE_PORT}/api/components`, json: true });

                config.redisClient.set('data', JSON.stringify(server_data));

                console.log("Redis: data components from server has been stored and returned !");

                res.status(200).json(server_data);
            }
            else
            {
                console.log("Redis: data components from cache has been returned !");

                res.status(200).json(JSON.parse(object));
            }
        });
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.clearData = (req, res) => {
    try {
        config.redisClient.keys('*', function(err, rows) {
            for (var i = 0; i < rows.length; i++) {
                config.redisClient.del(rows[i]);
            };
        });

        msg = "<h2>Redis memory has been cleared !</h2>";
        res.set('Content-Type', 'text/html');
        res.status(200).send(msg);
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};
