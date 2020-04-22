const redis = require('redis');
const redisHost = process.env["REDIS_HOST"] || "127.0.0.1";
const redisClient = redis.createClient({host: redisHost});

exports.redisHost = redisHost;
exports.redisClient = redisClient;
