const { isUsernameAvailable } = require('../../../models/Login/signup.js');
const encryptPassword = require('./passwordHelper.js');

const signup = (req, res) => {
  const { username, password } = req.body;
  isUsernameAvailable(username)
    .then(usernameAvailable => {
      if(!usernameAvailable) return res.status(409).send('Username Already Exists');
      const encryptedPassword = encryptPassword(password);
      res.send('Route under construction');
    })
    .catch(err => console.log(err));
}

module.exports = {
  signup
}