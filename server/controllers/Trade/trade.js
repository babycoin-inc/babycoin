const { Trade } = require('../../../models/models.js')

exports.buyTransaction = async (req, res) => {
  const result = await Trade.fulfillBuyOrder(req.params.id);
  res.send(result);
};

exports.sellTransaction = async (req, res) => {
  const result = await Trade.fulfillSellOrder(req.params.id);
  res.send(result);
}