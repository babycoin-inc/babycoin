const { Auth } = require('../../../models/models.js');
const { isUsernameUnavailable, registerUser } = Auth;
const { hashPassword } = require('../../utils/passwords.js');
const { createAccessToken, createRefreshToken, hashToken } = require('../../utils/tokens.js');

const AuthControllers = {
  signupController: async (req, res) => {
    const { username, password } = req.body;
    try {
      const usernameUnavailable = await isUsernameUnavailable(username);
      if(usernameUnavailable) return res.status(409).json({ msg: 'Username Already Exists' });
      const hash = hashPassword(password);
      const accessToken = createAccessToken(id, username);
      const refreshToken = createRefreshToken(id, username);
      const refreshTokenHash = hashToken(refreshToken);
      const id = await registerUser(username, hash, refreshTokenHash);
      const payload = { accessToken, refreshToken, id, username };
      res.status(201).json(payload);
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
    const payload = { accessToken, refreshToken, id, username };
    res.status(200).send(payload);
  }
}

module.exports = AuthControllers;