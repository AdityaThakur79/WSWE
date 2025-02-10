const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  skillsRequired: [
    {
      type: String,
      required: true,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
