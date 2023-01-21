import {config} from "dotenv";

config();

const {
  DB_USERNAME: databaseUsername,
  DB_PASSWORD: databasePassword,
  DB_DATABASE: databaseDatabase,
  DB_HOST: databaseHost,
  DB_PORT: databasePort,
} = process.env;

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: databaseUsername,
  password: databasePassword,
  database: databaseDatabase,
  host: databaseHost,
  port: databasePort,
});

export default pool;
