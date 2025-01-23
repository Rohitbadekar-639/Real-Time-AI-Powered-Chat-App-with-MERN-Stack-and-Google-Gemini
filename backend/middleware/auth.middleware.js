import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({ error: "Unauthorized User" });
    }

    // Check Redis if the token is invalid
    const isLoggedOut = await redisClient.get(token);
    if (isLoggedOut) {
      return res.status(401).send({ error: "Token is invalidated" });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).send({ error: "Unauthorized User" });
  }
};
