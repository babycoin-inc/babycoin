const { Auth } = require('../../../models/models.js');
const { isUsernameUnavailable, registerUser } = Auth.Signup;
const { hashPassword } = require('../../utils/passwords.js');

const AuthControllers = {
  signupController: async (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = hashPassword(password);

    try {
      const usernameUnavailable = await isUsernameUnavailable(username);
      if(usernameUnavailable) return res.status(409).send('Username Already Exists');
      await registerUser(username, encryptedPassword);
      res.status(201).send('Account Created');
    } catch (err) {
      console.log(err);
    }
  },
  loginController: (req, res) => {
    console.log('REQ.USER', req.user)
    const authorizedUser = {
      id: req.user.id,
      username: req.user.username
    };
    res.status(200).send(authorizedUser);
  }
}

module.exports = AuthControllers;