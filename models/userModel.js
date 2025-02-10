const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    role: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    emergencyNumber: {
      type: [Number],
      validator: {
        validator: function (value) {
          return value.length <= 4;
        },
        message: "you can add a maximum of  4 emergency numbers",
      },
    },
    post: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Workshop",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
