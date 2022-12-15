require('../db/index.js'); //tests db connection

const express = require('express');
require('dotenv').config();
const passport = require('../passport.config.js');

const app = express();
const port = process.env.PORT || 4000;

const flash = require('express-flash');
const session = require('cookie-session');

const cron = require('node-cron');

/**Controllers */
const { auth, nf, home, trade, leaderboard, market, achievements} = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'session',
  secret: 'secret',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
}));
app.use(passport.initialize())
app.use(passport.session())

app.post('/auth/signup', auth.signupController);
app.post('/auth/login', passport.authenticate('local'), auth.loginController);
app.post('/auth/refresh', auth.refreshTokenController);
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
//app.use(passport.authenticate('jwt')):


app.post('/users/:id/transactions/buy', passport.authenticate('jwt'), trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', passport.authenticate('jwt'), trade.insertSellTransaction);
app.get('/users/:id/balances/', passport.authenticate('jwt'), home.getPortfolioAssets);
app.get('/users/:id/transactions/', passport.authenticate('jwt'), home.getTransactions);
app.delete('/users/:id/portfolio/', passport.authenticate('jwt'), home.clearPortfolio)
//TODO: UPDATE ACHIEVEMENTS ROUTES TO HAVE USERS/ IN ROUTE

app.get('/achievements', achievements.getAchievements);
app.get('/achievements/:id', achievements.getUserAchievements);
app.post('/achievements/:id/:achievement', achievements.addUserAchievement);





app.get("/newsfeed/:coin", nf.getNews);
app.get("/nfAPI", nf.runAPI)

cron.schedule('*/30 * * * * *', () => {
  // //invoke a function that does not require a request and response
  market.updateCoins(); // update the coins table every 30s
});

//FOR THE FRONT END
app.get('/coins', trade.getCoin);
app.get('/coins/markets', market.getCoins);

app.get('/leaderboard', leaderboard.getLeaderboard);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});