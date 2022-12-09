const pool = require('../../db/index.js');

const Login = {
  getEncryptedPassword: (username) => {
    return pool
      .query('SELECT password FROM member WHERE username = $1', [username])
      .then(result => result.rows[0].password);
  },
  getUser: (username) => {
    return pool
      .query('SELECT * FROM member WHERE username = $1', [username])
      .then(result => result.rows[0] || false);
  }
}


module.exports = Login;