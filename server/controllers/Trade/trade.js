const {Trade} = require('../../../models/models.js')

//TEMP function to get random prices
exports.getCoin = (req, res) => {
  const name = req.query.name;
  const price = Trade.getCoin(name);
  res.send(JSON.stringify(price));
}

exports.insertBuyTransaction = async (req, res) => {
  var result = await Trade.insertBuyTransaction(req.body);
  res.sendStatus(201);
};

exports.insertSellTransaction = async (req, res) => {
  // const result = await Trade.fulfillSellTransaction(req);
  // res.send(result);
  var result = await Trade.insertSellTransaction(req.body);
  res.sendStatus(201).send(result);
}