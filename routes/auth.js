const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../middleware/authmiddleware");

const authController = require("../controllers/auth");
const taskController = require("../controllers/task");

router
  .post("/register", authController.signUp)
  .post("/login", authController.login)
  .post("/addTask", taskController.saveTask)
  .post("/forgot-password", authController.resetPassword)
  .get("/getTasks", taskController.getTasks);

exports.router = router;
