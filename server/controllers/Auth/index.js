const { Auth } = require('../../../models/models.js');
const { isUsernameUnavailable, registerUser } = Auth;
const { hashPassword } = require('../../utils/passwords.js');
const { createAccessToken, createRefreshToken } = require('../../utils/tokens.js');

const AuthControllers = {
  signupController: async (req, res) => {
    const { username, password } = req.body;
    const hash = hashPassword(password);
    try {
      const usernameUnavailable = await isUsernameUnavailable(username);
      if(usernameUnavailable) return res.status(409).json({ msg: 'Username Already Exists' });
      await registerUser(username, hash);
      res.status(201).json({ msg: 'Account Created' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error in signupController" })
    }
  },
  loginController: (req, res) => {
    console.log('REQ.USER', req.user)
    const { id, username } = req.user;
    const accessToken = createAccessToken(id, username);
    const refreshToken = createRefreshToken(id, username);
    const authorizedUser = { id, username, accessToken, refreshToken };
    res.status(200).send(authorizedUser);
  }
}

module.exports = AuthControllers;