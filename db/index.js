require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
});
 
module.exports = {
  async query(text, params) {
    return pool.query(text, params);
  },
};
