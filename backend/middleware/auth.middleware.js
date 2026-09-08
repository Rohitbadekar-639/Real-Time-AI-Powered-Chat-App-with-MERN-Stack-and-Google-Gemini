import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = req.cookies.token;

    if (!token && authHeader) {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).send({ error: "Unauthorized User" });
    }

    try {
      const isLoggedOut = await redisClient.get(token);
      if (isLoggedOut) {
        return res.status(401).send({ error: "Token is invalidated" });
      }
    } catch (redisError) {
      console.log("Redis not available, skipping token blacklist check");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(401).send({ error: "Unauthorized User" });
  }
};
