const db = require('./data/db');

function todo() {
  return db('todo');
}

function users() {
  return db('users');
}

function tasks() {
  return db('tasks');
}

function usersEx() {
  return db('users_ex');
}

function tasksEx() {
  return db('tasks_ex');
}

module.exports = {
  todo, tasks, tasksEx, users, usersEx,
};
