const pool = require('../../db/index.js');

const SignUp = {
  registerUser: (username, password) => pool.query('INSERT INTO users(username, password) values($1, $2) RETURNING ID', [username, password]),
  isUsernameUnavailable: (username) => {
    return (
      pool
        .query('SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)', [username])
        .then(result => result.rows[0].exists)
    );
  },
};

module.exports = SignUp;