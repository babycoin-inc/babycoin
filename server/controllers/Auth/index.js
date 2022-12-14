const { Auth } = require('../../../models/models.js');
const { isUsernameUnavailable, registerUser } = Auth;
const { hashPassword } = require('../../utils/passwords.js');
const { createNewTokens, createAccessToken, hashToken, verifyToken, getRefreshTokenFromHeaders } = require('../../utils/tokens.js');

const AuthControllers = {

  signupController: async (req, res) => {
    const { username, password } = req.body;
    try {
      const usernameUnavailable = await isUsernameUnavailable(username);
      if(usernameUnavailable) return res.status(409).json({ msg: 'Username Already Exists' });
      const hash = hashPassword(password);
      const [accessToken, refreshToken] = createNewTokens(id, username);
      const refreshTokenHash = hashToken(refreshToken);
      const id = await registerUser(username, hash, refreshTokenHash);
      const payload = { accessToken, refreshToken, id, username };
      res.status(201).json(payload);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error in signupController" })
    }
  },

  loginController: async (req, res) => { // USES LOCAL STRATEGY, NOT JWT!!!!!!!!
    //console.log('REQ', req)
    console.log('REQ.USER', req.user)
    const { id, username } = req.user;
    const [accessToken, refreshToken] = createNewTokens(id, username); //Create tokens for new login 'session'
    const refreshTokenHash = hashToken(refreshToken); //hash token for db storage
    try {
      await Auth.updateToken(refreshTokenHash, id); //update refresh token in db
      const payload = { accessToken, refreshToken, id, username };
      console.log('PAYLOAD', payload);
      res.status(200).send(payload); //send new tokens
    } catch(err) {
      console.log('ERROR UPDATING REFRESH TOKEN');
      res.status(500);
    }
  },

  refreshTokenController: async (req, res) => {
    const { id, username } = req.body; //Send username and id with refresh token request
    const headers = req.headers;
    const token = getRefreshTokenFromHeaders(headers);
    if(!token) return res.status(401).json({ message: 'unauthorized' });
    try {
      const hash = await Auth.getTokenHash(token);
      const isTokenVerified = await verifyToken(token, hash);
      if(!isTokenVerified) return res.status(401);
      //Not sure if refresh token is sent when sending back new access token???? Need to check if it expired???
      //For right now 14DEC2022 will only send back Access Token
      const accessToken = createAccessToken(id, username);
      const payload = { accessToken, id, username };
      res.status(200).json(payload)
    } catch(err) {
      console.log('Error verifying token');
      console.log(err);
      res.status(500);
    }
  }

}

module.exports = AuthControllers;