import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to register user.",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email.",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const payload = { _id: user._id };
    const secret = process.env.JWT_SECRET || "defaultSecret";
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24,
      secure: false,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Error in signin:", error.message);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Logged In",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const signout = (req, res) => {
  const userId = req.id;
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
      userId,
    });
  } catch (error) {
    console.error("Error in signout:", error.message);
    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
};
