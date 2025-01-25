const express = require("express");
const server = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const morgan = require("morgan");
const cors = require("cors");

// connect mongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/task-management-db");
  console.log("Database connected successfully");
}
main().catch((err) => {
  console.log("Error in connecting the dataBase", err);
});

// middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// All routes
server.use("/api/v1/auth", authRouter.router);

server.get("/", (req, res) => {
  res.send("Welcome to E-world!");
});

// define port and run listen server
const PORT = 8080;
server.listen(PORT, () => {
  console.log("Server Started");
});
