require("dotenv").config();
const { Pool, Client } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
});

const sql = fs.readFileSync('db/init.sql', 'utf8');

(async() => {
  try {
    await pool.connect();
    console.log(`Connected to database ${process.env.PGDATABASE} on port ${process.env.PGPORT}`);
    pool.query(sql);
  } catch(err) {
    if (err.code === '3D000') {
      console.log(`Database 'babycoin' doesn't exist. Creating database 'babycoin'.`)
      const client = new Client({ database: process.env.USER });
      await client.connect();
      await client.query('CREATE DATABASE babycoin');
      client.end();
      const pool = new Pool();
      console.log(`Connected to database ${process.env.PGDATABASE} on port ${process.env.PGPORT}`);
      pool.query(sql);
    } 
  } 
})();


// db.query(sql, (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('SQL file loaded successfully');
//   }
// });

// (async() => {
//   try {
//     await pool.connect();
//     console.log(`Connected to database ${process.env.PGDATABASE} on port ${process.env.PGPORT}`);
//     await pool.query(sql)
//   } catch(err) {
//     console.log(err);
//   }
// })();

module.exports = {
  query: (text, params) => pool.query(text, params),
  clientQuery: (client, text, params) => client.query(text, params),
  clientBegin: (client, text) => client.query('BEGIN'),
  clientCommit: (client, text) => client.query('COMMIT'),
  clientRollback: (client, text) => client.query('ROLLBACK'),
  clientRelease: (client) => client.release(),
  connect: () => pool.connect(),
};