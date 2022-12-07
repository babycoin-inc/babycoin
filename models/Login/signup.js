const pool = require('../db/index.js');

const SignUp = {
  isUsernameAvailable: (username) => {
    return (
      pool
        .query('SELECT EXISTS(SELECT 1 FROM authentication WHERE username = $1))', [username])
        .then(result => result.rows[0].exists);
    )
  },
}

module.exports = SignUp;