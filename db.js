require('dotenv').config();

const {
  DB_USERNAME: dbUsername,
  DB_PASSWORD: dbPassword,
  DB_DATABASE: dbDatabase,
  DB_HOST: dbHost,
  DB_PORT: dbPort,
} = process.env;

const { Pool } = require('pg');

const pool = new Pool({
  user: dbUsername,
  password: dbPassword,
  database: dbDatabase,
  host: dbHost,
  port: dbPort,
});

module.exports = pool;
