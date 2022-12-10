require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
const port = 3000;
const { home, trade } = require('./controllers/controllers.js');
const axios = require('axios');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/coins', trade.getCoin);

app.post('/users/:id/transactions/buy', trade.insertBuyTransaction);
app.post('/users/:id/transactions/sell', trade.insertSellTransaction);

app.post('/users/:id/transactions/buy', home.postBuyPortfolioUpdate);
app.post('/users/:id/transactions/sell', home.postSellPortfolioUpdate);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});