require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const Pool=require("pg").Pool
const pool=new Pool({
    user:dbUsername,
    password:dbPassword,
    database:dbDatabase,
    host:dbHost,
    port:dbPort,
})
module.exports = pool;