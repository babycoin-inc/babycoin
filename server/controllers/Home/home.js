const { Home } = require('../../../models/models.js');

exports.clearTransactions = async (req, res) => {
  const clearTrades = await Home.clearTransactions(req.params.id);
  res.send(clearTrades);
};

exports.clearPortfolio = async (req, res) => {
  const clearPortfolio = await Home.resetPortfolio(req.params.id);
  res.send(clearPortfolio);
}

exports.getRecentAchievement = (req, res) => {
  // get recent achievement data from user
};

exports.getPortfolioAssets = async (req, res) => {
  // get current crypto assets
  const portfolio = await Home.allCoins(req.params.id);
  res.send(portfolio);
};

exports.getTransactions = async (req, res) => {
  const transactions = await Home.getTransactionHistory(req.params.id);
  res.send(transactions);
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
