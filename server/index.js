require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
const port = 3000;

/**Controllers */
const { signup } = require('./controllers/Login/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', signup);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});