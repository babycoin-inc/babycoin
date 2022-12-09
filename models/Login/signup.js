const pool = require('../../db/index.js');

const SignUp = {
  registerUser: (username, password) => pool.query('INSERT INTO member(username, password) values($1, $2)', [username, password]),
  isUsernameAvailable: (username) => {
    return (
      pool
        .query('SELECT EXISTS(SELECT 1 FROM member WHERE username = $1))', [username])
        .then(result => result.rows[0].exists)
    );
  },
};

module.exports = SignUp;