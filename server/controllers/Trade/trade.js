const {Trade} = require('../../../models/models.js')

//TEMP function to get random prices
exports.getCoin = (req, res) => {
  const name = req.query.name;
  const price = Trade.getCoin(name);
  res.send(JSON.stringify(price));
}

exports.insertBuyTransaction = async (req, res) => {
  const {trader_id} = req.body;
  const result = await Trade.fulfillBuyTransaction(req.body, trader_id);
  res.send(result);
};

exports.insertSellTransaction = async (req, res) => {
  const {trader_id} = req.body;
  const result = await Trade.fulfillSellTransaction(req.body, trader_id);
  res.send(result);
}