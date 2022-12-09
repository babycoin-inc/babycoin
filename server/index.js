require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
const port = 4000;
const { home } = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//newsfeed
app.get("/newsfeed", (req, res) => {
  nfserver.getAll(console.log);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});