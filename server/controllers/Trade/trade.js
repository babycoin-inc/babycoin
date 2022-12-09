const { Trade } = require('../../../models/models.js')

exports.insertBuyTransaction = async (req, res) => {
  const result = await Trade.fulfillBuyTransaction(req);
  res.send(result);
};

exports.insertSellTransaction = async (req, res) => {
  const result = await Trade.fulfillSellTransaction(req);
  res.send(result);
}
