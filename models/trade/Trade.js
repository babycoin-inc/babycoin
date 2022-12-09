const { query } = require('../../db/index.js');

exports.fulfillBuyOrder = (id) => {
  // subtract total_trade_fiat from cash
  // add total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'fulfilled buy order';
};

exports.fulfillSellOrder = (id) => {
  // add total_trade_fiat from cash
  // subtract total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'fulfilled sell order';
};

