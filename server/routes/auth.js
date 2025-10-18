const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const error = new Error("Email and password required");
      error.statusCode = 400;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User does not exists");
      error.statusCode = 400;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });
  res.json({ msg: "User registered successfully" });
});

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const error = new Error("Email and password required");
      error.statusCode = 400;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }
    // Demo user; in prod, hash/compare
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    // Save newUser to DB (omitted for brevity)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }
    await newUser.save();
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });
  res.json({ msg: "User registered successfully" });
});

module.exports = router;
