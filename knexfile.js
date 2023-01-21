import {config} from "dotenv";

config();

export default {

  development: {
    client: "pg",
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    migrations: { directory: "./data/migrations", },
    seeds: { directory: "./data/seeds" },
  },

  testing: {
    client: "pg",
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    migrations: { directory: "./data/migrations", },
    seeds: { directory: "./data/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    migrations: { directory: "./data/migrations", },
    seeds: { directory: "./data/seeds" },
  },

};
