import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { sendEmail } from "../utils/EmailService.js";
import { serialize } from "cookie";

configDotenv(); // env variable access

// Signup
export const signup = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User exists" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "Signup successful", user: { name: newUser.email } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

// Signin
export const signin = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password",
      });
    }

    // Validate JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Signin successful",
      data: { userId: user._id, email: user.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Signin failed",
      ...(process.env.NODE_ENV !== "production" && { details: error.message }),
    });
  }
};
// Forget Password
export const forgetPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Todo: Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Todo: Send reset link via email
    const resetLink = `${process.env.PRODUCTION_CLIENT_URL}/reset-password?token=${resetToken}`;

    // Todo : To send a email to user
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      html: `<p>You requested a password reset.</p><p><a href="${resetLink}">Reset Password</a></p>`,
    });

    res.status(200).json({
      message: "Reset token generated and email sent",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      error: "Reset request failed",
      details: error.message,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { resetToken, newPassword } = req.body;

    let payload;
    try {
      payload = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: "Invalid/expired token" });
    }

    const user = await User.findById(payload?.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Password reset failed", details: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logout successful" });
};
