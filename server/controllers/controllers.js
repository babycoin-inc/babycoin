const { authenticateUser } = require('./Login/controllers.js');
const home = require('./Home/home.js');
const trade = require('./Trade/trade.js');

module.exports = {
  authenticateUser,
  home,
  trade
}