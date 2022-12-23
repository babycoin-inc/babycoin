const pool = require('../../db/index.js');

const Auth = {
  getHash: (username) => {
    return pool
      .query('SELECT password FROM trader WHERE username = $1', [username])
      .then(result => result.rows[0].password);
  },
  // MODIFIED TO ALSO RETURN PASSWORD
  getUser: (username) => {
    return pool
      .query('SELECT id, username, password FROM trader WHERE username = $1', [username])
      .then(result => result.rows[0] || null);
  },
  getUserByToken: (token) => {
    return pool
      .query('SELECT id, username, password FROM trader WHERE refresh_token = $1', [token])
      .then(result => result.rows[0] || null);
  },
  getUserById: (id) => {
    return pool
      .query('SELECT id, username, password FROM trader WHERE id = $1', [id])
      .then(result => result.rows[0] || null);
  },
  getUserByGoogleID: (googleID) => {
    return pool
      .query('SELECT id, googleid FROM trader WHERE googleid = $1', [googleID])
      .then(result => result.rows[0] || null);
  },
  updateToken: (token, id) => {
    return pool
      .query('UPDATE trader SET refresh_token = $1 WHERE id = $2', [token, id]);
  },
  getTokenHash: (token) => {
    return pool.
      query('SELECT refresh_token from trader WHERE refresh_token = $1', [token])
      .then(result => result.rows[0].refresh_token || null);
  },
  registerUser: (username, password) => {
    return pool
      .query('INSERT INTO trader(username, password) values($1, $2) RETURNING id', [username, password])
      .then(result => result.rows[0].id);
  },
  registerGoogleUser: (googleID) => {
    return pool
      .query('INSERT INTO trader(googleid) values($1) RETURNING id', [googleID])
      .then(result => result.rows[0].id);
  },
  isUsernameUnavailable: (username) => {
    return (
      pool
        .query('SELECT EXISTS(SELECT 1 FROM trader WHERE username = $1)', [username])
        .then(result => result.rows[0].exists)
    );
  },
}

module.exports = Auth;