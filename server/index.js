require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
const port = 3000;
const { nf, home, trade, market} = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);

app.get('/users/:id/balances/', home.getPortfolioAssets);
//newsfeed
app.get("/newsfeed", (req, res) => {
  console.log('This is working server index 13');
  nf.getNews(n=10,(err, result) => {
    if(err){
      res.status(500);
    } else {
      res.status(200).send(result);
    }
  })
});

app.get('/coins/markets', market.getCoins);

app.get("/nfAPI", (req, res) => {
  nf.runAPI((err,result) => {
    if(err){
      res.status(500);
    } else {
      res.status(200).send(result);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});