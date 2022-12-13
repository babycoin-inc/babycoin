require('../db/index.js'); //tests db connection
require('../passport.config.js');
const express = require('express');
require('dotenv').config();
const passport = require('passport');

const app = express();
const PORT = process.env.PORT;

const flash = require('express-flash');
const session = require('cookie-session');

/**Controllers */
const { signup, login, verifyToken, refreshToken } = require('./controllers/Login/controllers.js');
const { nf, home, trade, leaderboard, market, achievements} = require('./controllers/controllers.js');
// const { home } = require('./controllers/controllers.js');
require('../db/index.js'); //tests db connection
require("dotenv").config();

const express = require('express');

const app = express();
const port = process.env.PORT;

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

app.post('/signup', signup);
app.post('/login', (req, res, next) => {
  console.log(req.body);
  next();
}, passport.authenticate('local'), login);

app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);

app.get('/achievements', achievements.getAchievements);
app.get('/achievements/:trader_id', achievements.getUserAchievements);
app.post('/achievements/:trader_id', achievements.addUserAchievement);

// Gets all assets in user portfolio
app.get('/users/:id/balances/', home.getPortfolioAssets);
// Gets transaction history
app.get('/users/:id/transactions/', home.getTransactions);

app.delete('/users/:id/transactions/', home.clearTransactions);
app.delete('/users/:id/portfolio/', home.clearPortfolio)

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

app.get('/coins/markets', market.getCoins);

app.get('/leaderboard', leaderboard.getLeaderboard);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});