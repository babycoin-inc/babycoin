require('../db/index.js'); //tests db connection
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
require('../passport.config.js');
const app = express();
const port = 3000;

/**Controllers */
const { signup } = require('./controllers/Login/controllers.js');

app.use(passport.initialize());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', signup);
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});