const { Trade } = require('../../../models/models.js')

exports.buyTransactions = async (req, res) => {
  console.log('id', req.params.id);
  const result = await Trade.fulfillBuyOrder(req.params.id);
  res.send(result)
  // res.send('Hit Transaction Controller');
};