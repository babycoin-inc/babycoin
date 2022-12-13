const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Auth } = require('./models/models.js')
const { comparePasswords } = require('./server/utils/passwords.js');

const authenticateUser = async(username, password, done) => {
  try {
    const user = await Auth.getUser(username);
    if(!user) return done(null, false, { message: 'Unable to login with Username and Password' });
    const hash = await Auth.getHash(username);
    const doPasswordsMatch = await comparePasswords(password, hash);
    if(!doPasswordsMatch) return done(null, false, { message: 'Unable to login with Username and Password' });
    return done(null, user);
  } catch(err) {
    return done(err);
  }
};

passport.serializeUser((user, done) => {
  if(user.password) delete user.password;
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(new LocalStrategy(authenticateUser));

module.exports = passport;