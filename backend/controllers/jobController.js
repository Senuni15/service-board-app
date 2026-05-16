const JobRequest = require("../models/JobRequest");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { title, description, category, location, contactName, contactEmail } =
      req.body;

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      userId: req.user.id, // from JWT
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS
const getJobs = async (req, res) => {
  try {
    const jobs = await JobRequest.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE JOB
const getJobById = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
const updateJobStatus = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = req.body.status || job.status;

    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    await job.deleteOne();

    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const { title, description, category, location, contactName, contactEmail } =
      req.body;

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // update fields
    job.title = title || job.title;
    job.description = description || job.description;
    job.category = category || job.category;
    job.location = location || job.location;
    job.contactName = contactName || job.contactName;
    job.contactEmail = contactEmail || job.contactEmail;

    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJobStatus,
  deleteJob,
  updateJob,
};