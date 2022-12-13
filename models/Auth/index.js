const pool = require('../../db/index.js');

const Auth = {
  Login: {
    getHash: (username) => {
      return pool
        .query('SELECT password FROM users WHERE username = $1', [username])
        .then(result => result.rows[0].password);
    },
    getUser: (username) => {
      return pool
        .query('SELECT id, username FROM users WHERE username = $1', [username])
        .then(result => result.rows[0] || null);
    },
    getUserByToken: (token) => {
      return pool
        .query('SELECT id, username, password FROM users WHERE refresh_token = $1', [token])
        .then(result => result.rows[0] || null);
    },
    getUserById: (id) => {
      return pool
        .query('SELECT id, username, password FROM users WHERE id = $1', [id])
        .then(result => result.rows[0] || null);
    },
    updateToken: (token, id) => {
      return pool
        .query('UPDATE users SET refresh_token = $1 WHERE id = $2', [token, id]);
    },
  },
  Signup: {
    registerUser: (username, password) => pool.query('INSERT INTO users(username, password) values($1, $2)', [username, password]),
    isUsernameUnavailable: (username) => {
      return (
        pool
          .query('SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)', [username])
          .then(result => result.rows[0].exists)
      );
    },
  }
}

module.exports = Auth;