import knex from "knex";

import knexfile from "../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const configOptions = knexfile[environment];

export default knex(configOptions);
