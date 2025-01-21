const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// connect mongoDB
async function main() {
  await mongoose.connect("mongodb://localhost:27017/task-management-db");
  console.log("Database connected successfully");
}
main().catch((err) => {
  console.log("Error in connecting the dataBase", err);
});

// middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Welcome to E-world!");
});

// define port and run listen server
const PORT = 8080;
server.listen(PORT, () => {
  console.log("Server Started");
});
