require('../db/index.js'); //tests db connection

const express = require('express');
require('dotenv').config();
const passport = require('../passport.config.js');

const app = express();
const port = process.env.PORT || 4000;

const flash = require('express-flash');
const cookieParser = require('cookie-parser');
// const session = require('cookie-session');
//const session = require('express-session')

const cron = require('node-cron');
//const expressSession = require('express-session');
const session = require('./sessionConfig');
const cors = require('cors');

/**Controllers */
const { auth, nf, home, trade, leaderboard, market, achievements, dropdown, watchlist} = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// })
app.use(cookieParser());
app.use(session);
app.use(passport.initialize())
app.use(passport.session())

app.post('/auth/signup', auth.signupController);
app.post('/auth/login', passport.authenticate('local'), auth.loginController);
app.post('/auth/refresh', auth.refreshTokenController);
app.get('/auth/google', (req, res, next) => {
  console.log('HIT /auth/google ENDPOINT')
  console.log(req.sessionID);
  next();
},
  passport.authenticate('google', { scope:
      [ 'email' ] }
));

app.get( '/auth/google/callback', (req, res, next)=> {
  console.log('HIT /auth/google/callback ENDPOINT');
  next();
  },
    passport.authenticate( 'google', {
        successRedirect: '/',
        //failureRedirect: '/auth/login' TODO: MAKE FAILED LOGIN COMPONENT FOR GOOGLE!
}));
app.get('/getuser', (req, res) => {
  res.send(req.user);
})
app.get('/logout', auth.logoutController);
//app.use(passport.authenticate('jwt')); for protected routes


app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);
app.post('/users/:id/transactions/sellAll', trade.insertSellAllTransaction);
app.post('/users/:id/transactions/buyAll', trade.insertBuyAllTransaction);
app.get('/users/:id/balances/', home.getPortfolioAssets);
app.get('/users/:id/transactions/', home.getTransactions);
app.delete('/users/:id/portfolio/', home.clearPortfolio)
//TODO: UPDATE ACHIEVEMENTS ROUTES TO HAVE USERS/ IN ROUTE

app.get('/users/:id/achievements', achievements.getUserAchievements);
app.post('/users/:id/achievements/:achievement', achievements.addUserAchievement);
app.get('/achievements', achievements.getAchievements);





app.get("/newsfeed/:coin", nf.getNews);
app.get("/nfAPI", nf.runAPI);


cron.schedule('*/30 * * * * *', () => {
  // //invoke a function that does not require a request and response
  market.updateCoins(); // update the coins table every 30s
});
//FOR THE FRONT END
app.get('/coins', trade.getCoin);
app.get('/coins/markets', market.getCoins);
app.post('/users/:id/watchlist', dropdown.addToWatchlist);
app.delete('/users/:id/watchlist/:coin', watchlist.removeFromWatchlist);
app.delete('/users/:id/watchlist', watchlist.clearWatchlist);


app.get('/leaderboard', leaderboard.getLeaderboard);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});