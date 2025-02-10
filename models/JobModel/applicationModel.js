const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
