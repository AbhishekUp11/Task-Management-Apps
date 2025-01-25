const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/addTask", taskController.saveTask);

exports.router = router;
