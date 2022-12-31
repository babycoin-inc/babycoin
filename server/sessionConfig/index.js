const pg = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const { COOKIE_SECRET } = process.env
const COOKIE_MAX_AGE = 1000 * 60 * 15; // 15 min

const pgPool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

const session = expressSession({
  store: new pgSession({
    pool : pgPool,
    createTableIfMissing: true
  }),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
  }
})

module.exports = session;
