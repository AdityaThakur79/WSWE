const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const fs = require("fs");
const workShopModel = require("../models/workshopPostModel");
const { default: slugify } = require("slugify");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");

const pendingUsers = new Map();

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP via email
const sendOTPEmail = async (email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "adityathakur80070@gmail.com",
        pass: "pmjf vmqu pxqf mxnf",
      },
    });

    let mailOptions = {
      from: "leadmanagementapp@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #FAA845;">Women Security and Empowerment</h1>
          <p>Dear User,</p>
          <p>Your OTP code to register is:</p>
          <h2 style="color: #FAA845;">${otp}</h2>
          <p>Please enter this code to complete your registration process.</p>
          <br />
          <p>If you didn’t request this, please ignore this email.</p>
          <hr />
          <p style="font-size: 0.9em;">Thank you, <br /> Women Security and Empowerment Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

// below is the controller for registratiuon
const registerUserController = async (req, res) => {
  try {
    const { name, phone, answer, email, password } = req.body;

    if (!email || !password || !name || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Check if a pending user already exists for this email
    if (pendingUsers.has(email)) {
      return res.status(400).json({
        success: false,
        message: "OTP already sent. Please verify your email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = generateOTP();

    // Store user details and OTP temporarily
    pendingUsers.set(email, {
      name,
      email,
      phone,
      answer,
      hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    console.log("Pending Users Map:", pendingUsers);

    // Send OTP email
    await sendOTPEmail(email, otp);

    return res.status(200).json({
      success: true,
      pendingUsers: Array.from(pendingUsers.entries()),
      message:
        "Account created successfully. Please verify your email with the OTP sent.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong during registration",
      error,
    });
  }
};

// Verify OTP Controller
const verifyOTPController = async (req, res) => {
  try {
    const {email, otp } = req.body;

    // Check if the email exists in pending users
    if (!pendingUsers.has(email)) {
      return res
        .status(400)
        .json({ message: "No registration found for this email" });
    }

    const pendingUser = pendingUsers.get(email);

    // Validate OTP
    if (pendingUser.otp !== otp || Date.now() > pendingUser.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create the user in the database
    const newUser = await userModel.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.hashedPassword,
      phone: pendingUser.phone,
      answer: pendingUser.answer,
    });

    // Remove the user from pending list
    pendingUsers.delete(email);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully. User registered!",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// below is the contoller for user login
const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    console.log("login token", token);
    res
      .status(200)
      .send({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong in login",
    });
  }
};

// below is the controller for forgot password
const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ succes: false, message: "email is required" });
    }
    if (!newPassword) {
      return res
        .status(400)
        .send({ succes: false, message: "newPassword is required" });
    }
    if (!answer) {
      return res
        .status(400)
        .send({ succes: false, message: "answer is required" });
    }

    const user = await userModel.find({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    await userModel.findOneAndUpdate(user?._id, { password: hashed });
    return res.status(200).send({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};

module.exports = {
  registerUserController,
  verifyOTPController,
  userLoginController,
  forgotPasswordController,
};
