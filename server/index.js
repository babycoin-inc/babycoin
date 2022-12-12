require('../db/index.js'); //tests db connection
const express = require('express');

const app = express();

const port = 4000;
const { nf, home, trade, market} = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/coins', trade.getCoin);

app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);

// Gets all assets in user portfolio
app.get('/users/:id/balances/', home.getPortfolioAssets);
// Gets transaction history
app.get('/users/:id/transactions/', home.getTransactions);

app.delete('/users/:id/transactions/', home.clearTransactions);

// app.get("/newsfeed", async (req, res) => {
//   console.log(req.body);
//   try {
//     const result = await nf.getNews(n=10);
//     if(result.length > 0) {
//       res.status(200).send(result);
//     }
//   } catch (err) {
//       res.status(500);
//       console.log(err);
//   }
// });

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