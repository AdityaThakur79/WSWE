const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//below is the controller code for checking wheather signin or not
const signIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization token is required",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decode.id }; 
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while checking signed in or not",
    });
  }
};

// below is the controller code for checking wheather admin or not
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    console.log("user is", user);
    if (user?.role !== 1) {
      return res.status(401).send({
        success: "false",
        message: "admin validation failed not an admin",
      });
    } else {
      console.log("next executed");
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signIn, isAdmin, isAuthenticated };
