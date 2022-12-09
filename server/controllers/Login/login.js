const passport = require('passport');
const initializePassport = require('../../../passport.config.js');
const { Login } = require('../../../models/models.js');
const { login } = Login;
const { comparePasswords } = require('./passwordHelper.js');

const authenticateUser = async(username, password, done) => {
  try {
    const user = await login.getUser(username); //TODO: get user from database, figure out shape that Passport needs
    if(!user) return done(null, false, { message: 'Username does not exist' });
    const encryptedPassword = await login.getEncryptedPassword(username);
    const doPasswordsMatch = await comparePasswords(password, encryptedPassword);
    if(doPasswordsMatch) return done(null, user);
    else return done(null, false, { message: 'Password is incorrect' });
  } catch(err) {
    return done(err);
  }

}

//initializePassport(passport);

module.exports = authenticateUser;
