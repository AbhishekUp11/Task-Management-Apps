const task = require("../models/tasks");
const Task = task.Task;

exports.saveTask = async (req, res) => {
  const { id, name, description } = req.body;

  if (!id || !name || !description) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  try {
    const newTask = new Task(req.body);
    console.log("newTask", newTask);
    await newTask.save();
    res.status(201).send({
      success: true,
      message: "Task saved successfully.",
      task: newTask,
    });
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).send({ message: "Failed to save task." });
  }
};
