//const passport = require('passport');
//const initializePassport = require('../../../passport.config.js');
const { Login } = require('../../../models/models.js');
const { login } = Login;
const { comparePasswords } = require('./passwordHelper.js');
const jwt = require('jsonwebtoken');

// const authenticateUser = async(username, password, done) => {
//   try {
//     const user = await login.getUser(username); //TODO: get user from database, figure out shape that Passport needs
//     if(!user) return done(null, false, { message: 'Username does not exist' });
//     const encryptedPassword = await login.getEncryptedPassword(username);
//     const doPasswordsMatch = await comparePasswords(password, encryptedPassword);
//     if(doPasswordsMatch) return done(null, user);
//     else return done(null, false, { message: 'Password is incorrect' });
//   } catch(err) {
//     return done(err);
//   }
// }

const authenticateUser = async(username, password) => {
  try {
    const user = await login.getUser(username);
    if(!user) return null;
    const encryptedPassword = await login.getEncryptedPassword(username);
    const doPasswordsMatch = await comparePasswords(password, encryptedPassword);
    if(!doPasswordsMatch) return null;
    return user;
  } catch(err) {
    console.log(err);
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authenticateUser(username, password);
    if(!user) return res.status(400).json({msg: 'Unable to login with Username and Password'});
    const { id } = user;
    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s'
    });
    const refreshToken = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(400).json({msg: 'Unable to login with Username and Password'})
  }
}

