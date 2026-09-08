import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST;

const redisClient = redisHost
  ? new Redis({
      host: redisHost,
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    })
  : {
      get: async () => null,
      set: async () => null,
    };

if (redisHost) {
  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.on("error", (err) => {
    console.log("Redis connection error:", err.message);
  });
}

export default redisClient;
