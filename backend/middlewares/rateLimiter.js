const { RateLimiterRedis } = require("rate-limiter-flexible");
const Redis = require("ioredis");
const {
  RATELIMIT_IP,
  RATELIMIT_VISITOR_ID,
  RATELIMIT_IP_UA,
  FINGERPRINT_ID,
  USER_AGENT,
  IP,
} = require("../constants/contants");
const config = require("../config/config.json");
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD || undefined;

const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  enableOfflineQueue: false,
});

const visitorIdRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: RATELIMIT_VISITOR_ID,
  points: config.redis.rateLimiters.visitorIdRateLimiter.points,
  duration: config.redis.rateLimiters.visitorIdRateLimiter.duration,
  blockDuration: config.redis.rateLimiters.visitorIdRateLimiter.blockDuration,
});

const ipUaRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: RATELIMIT_IP_UA,
  points: config.redis.rateLimiters.ipUaRateLimiter.points,
  duration: config.redis.rateLimiters.ipUaRateLimiter.duration,
  blockDuration: config.redis.rateLimiters.ipUaRateLimiter.blockDuration,
});

const ipRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: RATELIMIT_IP,
  points: config.redis.rateLimiters.ipRateLimiter.points,
  duration: config.redis.rateLimiters.ipRateLimiter.duration,
  blockDuration: config.redis.rateLimiters.ipRateLimiter.blockDuration,
});

const rateLimiterMiddleware = async (req, res, next) => {
  let key, rateLimiter;
  if (req.headers[FINGERPRINT_ID]) {
    key = req.headers[FINGERPRINT_ID];
    rateLimiter = visitorIdRateLimiter;
  } else if (req.headers[USER_AGENT]) {
    key = `${req.ip}_${req.headers[USER_AGENT]}`;
    rateLimiter = ipUaRateLimiter;
  } else {
    key = req.headers[IP];
    rateLimiter = ipRateLimiter;
  }
  try {
    await rateLimiter.consume(key);
    next();
  } catch (e) {
    console.error("Error in rate limiter middleware:", e);
    res.status(429).json({
      message: "You have exhausted your prompts, please try again tomorrow!",
    });
  }
};

module.exports = rateLimiterMiddleware;
