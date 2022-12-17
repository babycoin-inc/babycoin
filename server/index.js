require('../db/index.js'); //tests db connection
require('../passport.config.js');
const express = require('express');
require('dotenv').config();
const passport = require('passport');

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

app.post('/signup', auth.signupController);
app.post('/login', passport.authenticate('local'), auth.loginController);

app.get('/coins', trade.getCoin);

app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);

app.get('/users/:id/achievements', achievements.getUserAchievements);
app.post('/users/:id/achievements/:achievement', achievements.addUserAchievement);
app.get('/achievements', achievements.getAchievements);

// Gets all assets in user portfolio
app.get('/users/:id/balances/', home.getPortfolioAssets);
// Gets transaction history
app.get('/users/:id/transactions/', home.getTransactions);

// Resets Portfolio, transaction history, and adds starting cash and achievement
app.delete('/users/:id/portfolio/', home.clearPortfolio)

app.get("/newsfeed/:coin", nf.getNews);
app.get("/nfAPI", nf.runAPI);


cron.schedule('*/30 * * * * *', () => {
  // //invoke a function that does not require a request and response
  market.updateCoins(); // update the coins table every 30s
});

//FOR THE FRONT END
app.get('/coins/markets', market.getCoins);


app.get('/leaderboard', leaderboard.getLeaderboard);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});