require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
});

try {
  await pool.connect();
  console.log(`Connected to database ${process.env.PGDATABASE} on port ${process.env.PGPORT}`);
} catch(err) {
  console.log(err);
}


module.exports = {
  query: (text, params) => pool.query(text, params),
  clientQuery: (client, text, params) => client.query(text, params),
  clientBegin: (client, text) => client.query('BEGIN'),
  clientCommit: (client, text) => client.query('COMMIT'),
  clientRollback: (client, text) => client.query('ROLLBACK'),
  clientRelease: (client) => client.release(),
  connect: () => pool.connect(),
};
