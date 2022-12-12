// require('../db/index.js'); //tests db connection
// require('../passport.config.js');
// const express = require('express');
// require('dotenv').config();
// const passport = require('passport');

// const app = express();
// const PORT = process.env.PORT;

// const flash = require('express-flash');
// const session = require('cookie-session');

// /**Controllers */
// const { signup, login, verifyToken, refreshToken } = require('./controllers/Login/controllers.js');
// // const { home } = require('./controllers/controllers.js');

// app.use(express.static(__dirname + '/../client/dist'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   name: 'session',
//   secret: 'secret',
//   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
// }));
// app.use(passport.initialize())
// app.use(passport.session())

// app.post('/signup', signup);
// app.post('/login', (req, res, next) => {
//   console.log(req.body);
//   next();
// }, passport.authenticate('local'), login);


// // app.post('/users/:id/transactions/buy', home.postBuyPortfolioUpdate);
// // app.post('/users/:id/transactions/sell', home.postSellPortfolioUpdate);


// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const routes = require('./routes/index.js')
const PORT = process.env.PORT || 3000;

const configurePassport = require('../passport.config.js');
const passport = require('passport');

const app = express();
configurePassport(app);
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});

