const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Auth } = require('./models/models.js');
const authenticateUser = require('./server/utils/userAuth');
const { comparePasswords } = require('./server/utils/passwords.js');

const verifyUser = async(username, password, done) => {
  try {
    const user = await Auth.getUser(username);
    if(!user) return done(null, false, { message: 'Unable to login with Username and Password' });
    const isUserAuthenticated = await authenticateUser(username, password);
    if(!isUserAuthenticated) return done(null, false, { message: 'Unable to login with Username and Password' });
    done(null, user);
  } catch(err) {
    done(err);
  }
};

passport.serializeUser((user, done) => {
  if(user.password) delete user.password;
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(new LocalStrategy(verifyUser));

module.exports = passport;