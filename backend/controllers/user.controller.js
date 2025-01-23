import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    const token = await user.generateJWT();
    delete user._doc.password;
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        errors: "Invalid Credentials",
      });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        errors: "Invalid Credentials",
      });
    }
    const token = await user.generateJWT();
    delete user._doc.password;
    res.status(200).json({ user, token });
  } catch (err) {
    res.send(400).send(err.message);
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    user: req.user,
  });
};

export const logoutController = async (req, res) => {
  try {
    // Get the token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      // If no token is found, send an error response
      return res.status(400).send({ error: "No token provided" });
    }

    // Save the token in Redis with an expiration time (e.g., 24 hours)
    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    // Clear the token from cookies
    res.clearCookie("token", { httpOnly: true });

    // Send success response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    // Handle any errors
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });
    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: message });
  }
};
