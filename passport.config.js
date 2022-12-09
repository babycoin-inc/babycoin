const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticateUser } = require('./server/controllers/controllers.js')

// const initialize = (passport) => {

  passport.use(new LocalStrategy(authenticateUser));
  //passport.serializeUser()
// }

// module.exports = initialize;