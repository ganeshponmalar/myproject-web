import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {protect} from "../middleware/midauth.js"

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });


// REGISTER USER
router.post("/reg", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body, "from the req body");

    // 1️ Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2️ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }



    // 3️ Create user (password auto-hashed by mongoose)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 4️ Generate JWT
    const token = generateToken(user._id);

    // 5️ Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // 6 Send response (no password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,       // JS cannot access
    secure: false,        // true in production (HTTPS)
    sameSite: "strict",   // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
});



// GET PROFILE
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

router.post("/logout",protect,async(req,res)=>{
  res.clearCookie('token').json({
    sucess: true,
    message: 'Logged out successfully'
  })
})


export default router;
