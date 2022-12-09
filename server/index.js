require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
<<<<<<< HEAD
const port = 3000;
const { home } = require('./controllers/controllers.js');
=======
const port = 4000;
>>>>>>> Alex-1

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD

app.post('/users/:id/transactions/buy', home.postBuyPortfolioUpdate);
app.post('/users/:id/transactions/sell', home.postSellPortfolioUpdate);

=======
//newsfeed
app.get("/newsfeed", (req, res) => {
  nfserver.getAll(console.log);
});
>>>>>>> Alex-1

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});