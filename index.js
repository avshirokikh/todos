import express from "express";

import cors from "cors";

import pool from "./db.js";
import database from "./dbHelpers.js";

import root from "./routes/root.js";
import login from "./routes/login.js";
import allTasks from "./routes/allTasks.js";
import task from "./routes/task.js";

import subordinates from "./routes/subordinates.js";

import userTasks from "./routes/userTasks.js";

import initDatabase from "./routes/initDatabase.js";

import saveTask from "./routes/saveTask.js";

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(
  root,
  login,
  allTasks,
  task,
  subordinates,
  userTasks,
  initDatabase,
  saveTask,
);

const port = process.env.PORT;
console.log(`Your port is ${port}`);

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
