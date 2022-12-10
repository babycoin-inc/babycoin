const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Login } = require('./models/Login/models.js')
const { comparePasswords } = require('./server/controllers/Login/passwordHelper.js');

const authenticateUser = async(username, password, done) => {
  try {
    const user = await Login.getUser(username);
    if(!user) return done(null, false, { message: 'Unable to login with Username and Password' });
    const encryptedPassword = await Login.getEncryptedPassword(username);
    const doPasswordsMatch = await comparePasswords(password, encryptedPassword);
    if(!doPasswordsMatch) return done(null, false, { message: 'Unable to login with Username and Password' });
    return done(null, user);
  } catch(err) {
    return done(err);
  }
};

passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user);
})

passport.deserializeUser(async(user, done) => {
  // const user = await Login.getUserById(id);
  return done(null, user);
})

// const initialize = (passport) => {

  passport.use(new LocalStrategy(authenticateUser));
  //passport.serializeUser()
// }

// module.exports = initialize;
module.exports = passport;