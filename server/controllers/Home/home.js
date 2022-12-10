const { Home } = require('../../../models/models.js');

exports.getAccountValue = (req, res) => {
  // get SUM of cash balance, and all of current crypto value
};

exports.getRecentAchievement = (req, res) => {
  // get recent achievement data from user
};

exports.getPortfolioAssets = async (req, res) => {
  // get current crypto assets
  const portfolio = await Home.allCoins(req.params.id);
  res.send(portfolio);
};

exports.getTradeHistory = (req, res) => {
  // get recent trade history
};

exports.postBuyPortofolioUpdate = (req, res) => {
  // subtract purchase amount from cash if not already done
  // add units of coin to quantity in portfolio
  //
};

exports.postBuyPortfolioUpdate = (req, res) => {
  res.send(`Hit post buy ${req.params.id}`);
};

exports.postSellPortfolioUpdate = (req, res) => {
  res.send(`Hit post sell ${req.params.id}`);
};
