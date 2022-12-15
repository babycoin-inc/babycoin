const { Home } = require('../../../models/models.js');


exports.getPortfolioAssets = async (req, res) => {
  try {
    const portfolio = await Home.allCoins(req.params.id);
    res.send(portfolio);
  } catch (err) {
    console.error(err);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Home.getTransactionHistory(req.params.id);
    res.send(transactions);
  } catch (err) {
    console.error(err);
  }
};

exports.clearPortfolio = async (req, res) => {
  try {
    const clearPortfolio = await Home.resetPortfolio(req.params.id);
    res.send(clearPortfolio);
  } catch (err) {
    console.error(err);
  }
}


