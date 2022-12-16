//require('../db/index.js'); //tests db connection

const express = require('express');
require('dotenv').config();
const passport = require('../passport.config.js');

const app = express();
const port = process.env.PORT || 4000;

const flash = require('express-flash');
// const session = require('cookie-session');
//const session = require('express-session')

const cron = require('node-cron');
const session = require('./sessionConfig');

/**Controllers */
const { auth, nf, home, trade, leaderboard, market, achievements} = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
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
//app.use(passport.authenticate('jwt')); for protected routes


app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);
app.get('/users/:id/balances/', home.getPortfolioAssets);
app.get('/users/:id/transactions/', home.getTransactions);
app.delete('/users/:id/portfolio/', home.clearPortfolio)
//TODO: UPDATE ACHIEVEMENTS ROUTES TO HAVE USERS/ IN ROUTE

app.get('/achievements', achievements.getAchievements);
app.get('/achievements/:id', achievements.getUserAchievements);
app.post('/achievements/:id/:achievement', achievements.addUserAchievement);





app.get("/newsfeed", async (req, res) => {
  console.log(req.body);
  try {
    const result = await nf.getNews(n=10);
    if(result.length > 0) {
      res.status(200).send(result);
    }
  } catch (err) {
      res.status(500);
      console.log(err);
  }
});

app.get("/nfAPI", (req, res) => {
  nf.runAPI((err,result) => {
    if(err){
      res.status(500);
    } else {
      res.status(200).send(result);
    }
  })
})


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