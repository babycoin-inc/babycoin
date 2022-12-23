require('dotenv').config();
const { Auth } = require('../../../models/models.js');
const { isUsernameUnavailable, registerUser } = Auth;
const { hashPassword } = require('../../utils/passwords.js');
const { createNewTokens, createAccessToken, hashToken, compareTokenAndHash, getRefreshTokenFromHeaders } = require('../../utils/tokens.js');
const bcrypt = require('bcrypt');


const AuthControllers = {

  altSignup: async (req, res) => {
    const { username, password } = req.body;
    try {
      const usernameUnavailable = await isUsernameUnavailable(username);
      if(usernameUnavailable) return res.status(409).json({ msg: 'Username Already Exists' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await registerUser(username, hashedPassword);
      res.status(201).json(id);
    } catch(err) {
      console.log(err);
    }
  },

  altLogin: async (req, res) => {
    console.log('Hit ALT LOGIN');
    const { username, password } = req.body;
    const user = await Auth.getUser(username);
    if (user === null) {
      return 'Cannot find username';
    }
    try {
      console.log('USER', user);
      if(await bcrypt.compare(password, user.password)) {
        res.send(user);
      } else {
        res.send('Passwords Do Not Match');
      }
    } catch {
      console.log(err);
      res.status(500).json({ msg: "Error in signupController" })
    }
  },

  signupController: async (req, res) => {
    const { username, password } = req.body;
    try {
      const usernameUnavailable = await isUsernameUnavailable(username);
      if(usernameUnavailable) return res.status(409).json({ msg: 'Username Already Exists' });
      const hash = hashPassword(password);
      const id = await registerUser(username, hash);
      const [accessToken, refreshToken] = createNewTokens(id, username);
      const refreshTokenHash = hashToken(refreshToken);
      await Auth.updateToken(refreshTokenHash, id);
      const payload = { accessToken, refreshToken, id, username };
      res.status(201).json(payload);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error in signupController" })
    }
  },

  loginController: async (req, res) => { // USES LOCAL STRATEGY, NOT JWT!!!!!!!!
    console.log('REQ.USER', req.user)
    console.log('REQ SESSION', req.session)
    const { id, username } = req.user;
    const [accessToken, refreshToken] = createNewTokens(id, username); //Create tokens for new login 'session'
    const refreshTokenHash = hashToken(refreshToken); //hash token for db storage
    try {
      await Auth.updateToken(refreshTokenHash, id); //update refresh token in db
    } catch(err) {
      console.log('ERROR UPDATING REFRESH TOKEN');
      return res.status(500);
    }
    const payload = { accessToken, refreshToken, id, username };
    console.log('PAYLOAD', payload);
    res.status(200).send(payload); //send new tokens
  },

  refreshTokenController: async (req, res) => {
    const { id, username } = req.body; //Send username and id with refresh token request
    const headers = req.headers;
    const token = getRefreshTokenFromHeaders(headers);
    if(!token) return res.status(401).json({ message: 'unauthorized' });
    try {
      const hash = await Auth.getTokenHash(token);
      const doesTokenMatchHash = await compareTokenAndHash(token, hash);
      if(!doesTokenMatchHash) return res.status(401);
      await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch(err) {
      console.log('ERROR VERIFYING TOKEN');
      return res.status(500);
    }
    const [accessToken, refreshToken] = createNewTokens(id, username);
    const hashedRefreshToken = hashToken(refreshToken);
    try {
      await Auth.updateToken(hashedRefreshToken, id);
    } catch(err) {
      console.log('Error updating token');
      console.log(err);
      return res.status(500);
    }
    const payload = { accessToken, refreshToken, id, username };
    res.status(200).json(payload);
  },

  //Currently set up for sessions
  logoutController: (req, res) => {
    if(req.user) {
      req.logOut();
    }

   // await req.session.destroy();
    req.user = null;
    console.log('REQ USER', req.user)
    //res.redirect('/');
    res.json(req.user);
  }

}

module.exports = AuthControllers;