require('../db/index.js'); //tests db connection
require("dotenv").config();

const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

const { nf, home, trade, leaderboard, market, achievements} = require('./controllers/controllers.js');

const cron = require('node-cron');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/coins', trade.getCoin);

app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);

app.get('/achievements', achievements.getAchievements);
app.get('/achievements/:trader_id', achievements.getUserAchievements);
app.post('/achievements/:trader_id', achievements.addUserAchievement);

// Gets all assets in user portfolio
app.get('/users/:id/balances/', home.getPortfolioAssets);
// Gets transaction history
app.get('/users/:id/transactions/', home.getTransactions);

// Resets Portfolio, transaction history, and adds starting cash and achievement
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