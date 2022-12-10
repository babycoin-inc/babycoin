// require('../db/index.js'); //tests db connection
// require('../passport.config.js');
const express = require('express');
require('dotenv').config();
// const passport = require('passport');
const app = express();
const PORT = process.env.PORT;

const flash = require('express-flash');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
const session = require('cookie-session');

/**Controllers */
const { signup, login, verifyToken, refreshToken } = require('./controllers/Login/controllers.js');
// const { home } = require('./controllers/controllers.js');

// app.use(passport.initialize());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'session',
  secret: 'secret',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
}));

// app.use(cookieParser(process.env.COOKIE_SECRET))
// const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(',') : [];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },

//   credentials: true,
// }
// app.use(cors(corsOptions));

app.post('/auth/signup', signup);
app.post('/auth/login', login);
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }), (req, res) => {

// });

// app.post('/users/:id/transactions/buy', home.postBuyPortfolioUpdate);
// app.post('/users/:id/transactions/sell', home.postSellPortfolioUpdate);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});