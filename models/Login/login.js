const pool = require('../../db/index.js');

const Login = {
  getEncryptedPassword: (username) => {
    return pool
      .query('SELECT password FROM users WHERE username = $1', [username])
      .then(result => result.rows[0].password);
  },
  getUser: (username) => {
    return pool
      .query('SELECT id, username, password FROM users WHERE username = $1', [username])
      .then(result => result.rows[0] || false);
  },
  updateToken: (token, id) => {
    return pool
      .query('UPDATE users SET refresh_token = $1 WHERE id = $2', [token, id]);
  }
}


module.exports = Login;