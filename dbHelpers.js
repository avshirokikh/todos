const knex = require('knex');
const knexfile = require('./knexfile');
const db = require("./data/db.js"); // importing the db config

module.exports = { todo, tasks, tasks_ex, users, users_ex }

function todo(){
  return db('todo')
}

function users(){
  return db('users')
}

function tasks(){
  return db('tasks')
}

function users_ex(){
  return db('users_ex')
}

function tasks_ex(){
  return db('tasks_ex')
}

