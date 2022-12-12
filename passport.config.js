const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { authenticateUser } = require('./server/utils/userAuth.js');
const { Login } = require('./models/models.js').Auth;

const configurePassport = (app) => {

  passport.serializeUser((user, done) => {
    if(user.password) delete user.password; //Make sure password is not sent back to client! (Currently this is not on user object, but just in case!)
    done(null, user);
  });

  passport.deserializeUser((user, done) => done(null, user));

  passport.use(
    new LocalStrategy(
      async(username, password, done) => {
        try {
          const user = await Login.getUser(username); //returns { username, id }
          if(!user) return done(null, false);
          const isUserAuthenticated = await authenticateUser(username, password);
          if(!isUserAuthenticated) return done(null, false);
          done(null, user)
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: JWTStrategy.extractJwt.fromAuthHeaderAsBearerToken(),
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

  app.use(passport.initialize());
}



module.exports = configurePassport;