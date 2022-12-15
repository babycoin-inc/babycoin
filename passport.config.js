require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const { ExtractJwt } = require('passport-jwt');
const { Auth } = require('./models/models.js');
const authenticateUser = require('./server/utils/userAuth');
const { comparePasswords } = require('./server/utils/passwords.js');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    },
    (payload, done) => {
      try {
        done(null, payload);
      } catch(err) {
        done(err);
      }
    }
  )
);


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_REDIRECT_URI,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;