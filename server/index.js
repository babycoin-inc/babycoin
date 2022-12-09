require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
const port = 3000;
const { home, trade } = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/users/:id/transactions/buy', trade.buyTransaction);
app.post('/users/:id/transactions/sell', trade.sellTransaction);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});