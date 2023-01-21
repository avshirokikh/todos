import database from "./data/db.js";

function todo () {
  return database("todo");
}

function users () {
  return database("users");
}

function tasks () {
  return database("tasks");
}

function usersEx () {
  return database("users_ex");
}

function tasksEx () {
  return database("tasks_ex");
}

export default {
  todo, tasks, tasksEx, users, usersEx,
};
