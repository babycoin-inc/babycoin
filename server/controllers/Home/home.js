const Home = require('../../../models/home/Home.js');

exports.getAccountValue = (req, res) => {
  // get SUM of cash balance, and all of current crypto value
};

exports.getRecentAchievement = (req, res) => {
  // get recent achievement data from user
};

exports.getPortfolioAssets = (req, res) => {
  // get current crypto assets
};

exports.getTradeHistory = (req, res) => {
  // get recent trade history
};

exports.postBuyPortfolioUpdate = (req, res) => {
  res.send(`Hit post buy ${req.params.id}`);
};

exports.postSellPortfolioUpdate = (req, res) => {
  res.send(`Hit post sell ${req.params.id}`);
};