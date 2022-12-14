require('../db/index.js'); //tests db connection

const express = require('express');
require('dotenv').config();
const passport = require('../passport.config.js');

const app = express();
const PORT = process.env.PORT || 4000;

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
//app.use(passport.authenticate('jwt')):


app.post('/users/:id/transactions/buy', passport.authenticate('jwt'), trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', passport.authenticate('jwt'), trade.insertSellTransaction);
app.get('/users/:id/balances/', passport.authenticate('jwt'), home.getPortfolioAssets);
app.get('/users/:id/transactions/', passport.authenticate('jwt'), home.getTransactions);
app.delete('/users/:id/portfolio/', passport.authenticate('jwt'), home.clearPortfolio)





app.get('/achievements', achievements.getAchievements);
app.get('/achievements/:trader_id', achievements.getUserAchievements);
app.post('/achievements/:trader_id', achievements.addUserAchievement);


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


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});