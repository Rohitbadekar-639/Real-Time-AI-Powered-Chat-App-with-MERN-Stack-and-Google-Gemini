import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
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

    // Check Redis if token is invalid (skip if Redis is not connected)
    try {
      const isLoggedOut = await redisClient.get(token);
      if (isLoggedOut) {
        return res.status(401).send({ error: "Token is invalidated" });
      }
    } catch (redisError) {
      console.log("Redis not available, skipping token blacklist check");
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(401).send({ error: "Unauthorized User" });
  }
};
