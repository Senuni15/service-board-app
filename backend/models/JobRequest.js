const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },

 category: {
  type: String,
  enum: [
    "plumbing",
    "electrical",
    "painting",
    "joinery",
    "cleaning",
    "gardening",
    "other",
  ],
  required: true,
},

  location: String,

  contactName: String,

  contactEmail: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobRequest", jobRequestSchema);