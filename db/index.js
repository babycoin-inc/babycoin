require("dotenv").config();
const { Pool } = require('pg');
const { Client } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT
});

// must use client if doing transaction
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT
});

const connectDb = async () => {
  try {
    const poolCheck = new Pool();
    await poolCheck.connect();
    console.log(`Connected to database ${process.env.PGDATABASE} on port ${process.env.PGPORT}`);
    await poolCheck.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { pool, client, connectDb };


// module.exports = {
//   async query(text, params) {
//     return pool.query(text, params);
//   },
// };
