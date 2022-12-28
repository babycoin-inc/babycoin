require("dotenv").config();
const { Pool, Client } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: process.env.PGUSER,
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
    await pool.query(sql);
    console.log('run pool.query(sql)');
    await pool.query(`COPY achievements FROM '${__dirname}/achievements.csv' DELIMITER ',' CSV HEADER`);
    console.log('copy the acheivement');
  } catch(err) {
    console.log('in the catch blog', err);
    if (err.code === '3D000') {
      try {
        console.log(`Database 'babycoin' doesn't exist. Creating database 'babycoin'.`)
        const client = new Client({ database: process.env.PGUSER });
        await client.connect();
        await client.query('CREATE DATABASE babycoin');
        client.end();
        const pool = new Pool();
        console.log(`Connected to database ${process.env.PGDATABASE} on port ${process.env.PGPORT}`);
        await pool.query(sql);
        await pool.query(`COPY achievements FROM '${__dirname}/achievements.csv' DELIMITER ',' CSV HEADER`);
      } catch (err) {
        console.log('Error in the database:', err);
      }
    }
  }
})();

module.exports = {
  query: (text, params) => pool.query(text, params),
  clientQuery: (client, text, params) => client.query(text, params),
  clientBegin: (client) => client.query('BEGIN'),
  clientCommit: (client) => client.query('COMMIT'),
  clientRollback: (client) => client.query('ROLLBACK'),
  clientRelease: (client) => client.release(),
  connect: () => pool.connect(),
};
