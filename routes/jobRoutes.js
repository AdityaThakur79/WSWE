const express = require("express");
const router = express.Router();
const jobController = require("../controller/jobController");
const { signIn, isAdmin } = require("../middlewares/authMiddleware.js");
const { upload } = require("../utils/multer.js");

// Routes for Admin
router.post("/jobs", signIn, jobController.createJob);
router.put("/jobs/:jobId", signIn, jobController.updateJob);
router.delete("/jobs/:jobId", signIn, jobController.deleteJob);
router.get("/jobs/:jobId", signIn, jobController.getJobById);
router.get("/jobs", signIn, jobController.getAllJobs);
router.post("/:jobId/summarize", jobController.summarizeJobDescription);

router.post(
  "/:jobId/apply-job",
  upload.single("resume"),
  signIn,
  jobController.applyJobController
);

router.get("/applied-jobs", signIn, jobController.getAppliedJobsByUser);
router.get("/:jobId/applicants", signIn, jobController.getJobApplications);

module.exports = router;
