const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJobStatus,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE JOB (login required)
router.post("/", protect, createJob);

// GET ALL JOBS
router.get("/", getJobs);

// GET SINGLE JOB
router.get("/:id", getJobById);

// UPDATE STATUS
router.put("/:id/status", protect, updateJobStatus);

// DELETE JOB
router.delete("/:id", protect, deleteJob);

// UPDATE JOB
router.put("/:id", protect, updateJob);

module.exports = router;