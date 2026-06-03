const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10_000,
    reconnectStrategy: (retries) => (retries > 3 ? false : Math.min(retries * 200, 2000)),
  },
});

redisClient.on('error', (err) => {
  if (redisClient.isReady) {
    console.error('Redis Error:', err.message);
  }
});

const isRedisReady = () => redisClient.isReady;

module.exports = redisClient;
module.exports.isRedisReady = isRedisReady;
