import database from "./data/db.js";
export const dbe=database;



export function todo () {
  return database("todo");
}

export function users () {
  return database("users");
}

export function tasks () {
  return database("tasks");
}

export function usersEx () {
  return database("users_ex");
}

export function tasksEx () {
  return database("tasks_ex");
}

export default {
  todo, tasks, tasksEx, users, usersEx, dbe
};
