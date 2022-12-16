const pg = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const pgPool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

// const options = {
//   pool: pgPool,
//   createTableIfMissing: true,
// }

// const pgSessionStore = new pgSession(options)

// const session = expressSession({
//   store: pgSessionStore,
//   secret: 'secret',
//   maxAge: 15000
// });

const session = expressSession({
  store: new pgSession({
  pool : pgPool,
  createTableIfMissing: true
  }),
  secret: 'secret',

  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 15000
  }
})

module.exports = session;
