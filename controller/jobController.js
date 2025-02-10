const Job = require("../models/JobModel/jobModel");
const Application = require("../models/JobModel/applicationModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { uploadMedia } = require("../utils/cloudinary");
const userModel = require("../models/userModel");

// Create a job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skillsRequired,
      location,
      salary,
      level,
    } = req.body;
    const newJob = new Job({
      title,
      description,
      category,
      skillsRequired,
      location,
      salary,
      level,
      employerId: req.user.id,
    });

    await newJob.save();
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error,
    });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updates = req.body;

    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating job", error });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting job", error });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("employerId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching jobs", error });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate("employerId", "name email");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching job details", error });
  }
};

//Job Description Summary
exports.summarizeJobDescription = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    const genAI = new GoogleGenerativeAI(process.env.JOB_SUMMARIZATION_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Summarize the following Description given in 3-4 lines ignoring the html tags: ${job?.description}`
    );
    const summarizedText = result.response.text();
    return res.status(200).send({
      success: true,
      summarizedText,
      message: "Text Summarized Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Somewthing Went Wrong", error });
  }
};

//Apply Job
exports.applyJobController = async (req, res) => {
  try {
    const { jobId } = req.params; // Extract jobId from params
    const { coverLetter } = req.body; // Extract cover letter from body
    const resume = req.file; // Extract resume file

    // Check if the resume is provided
    if (!resume) {
      return res.status(400).json({ error: "Resume is required." });
    }

    // Validate job existence
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    // Check for previous application (optional, based on business rules)
    const existingApplication = await Application.findOne({
      jobId: jobId,
      applicantId: req.user._id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job." });
    }

    // Upload resume to Cloudinary (or another media service)
    const cloudResponse = await uploadMedia(resume.path);

    // Create the application
    const application = new Application({
      jobId: jobId,
      applicantId: req.user.id,
      resume: cloudResponse.secure_url,
      coverLetter,
    });

    await application.save();

    // Add jobId to the user's appliedJobs array
    await userModel.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { appliedJobs: jobId } },
      { new: true }
    );

    // Add the userId to the job's applications array
    await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { applications: application } },
      { new: true }
    );

    res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something Went Wrong", error });
  }
};

//Get Jobs Applied by User with Application Details
exports.getAppliedJobsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and populate the appliedJobs field with application details and job details
    const user = await userModel.findById(userId).populate("appliedJobs");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Applied jobs with application details fetched successfully.",
      appliedJobs: user.appliedJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//All Applicants to a Job
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: [
        { path: "jobId", select: "title description" }, // Populate job details
        { path: "applicantId", select: "name email" }, // Populate applicant details
      ],
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({
      message: "Applications fetched successfully",
      applications: job.applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
