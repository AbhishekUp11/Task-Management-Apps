const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Done"],
    default: "Pending",
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

exports.Task = mongoose.model("Task", taskSchema);
