var {query} = require('../../db/index.js');

exports.getTransactions = (id) => {

};

// Buy
exports.insertTransaction = (transaction, user_id) => {
  //parse the following:

  // order_type transaction_type,
  // currency VARCHAR(10) NOT NULL,
  // purchase_price INTEGER NOT NULL,
  // total_trade_fiat INTEGER NOT NULL,
  // total_trade_coin INTEGER NOT NULL,
  // order_datetime timestamp,
  // user id => trader_id INTEGER REFERENCES trader(id),
  // coin_id INTEGER REFERENCES coins(id)
};

//Sell
exports.insertSellTransaction = (transaction, user_id) => {

}






exports.fulfillBuyTransaction = (transaction, user_id) => {
  // Subtract total_trade_fiat from cash
  // add total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'Hit Fulfill Buy Transaction';
}

exports.fulfillSellTransaction = (transaction, user_id) => {
  // add total_trade_fiat from cash
  // subtract total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'Hit Fulfill Sell Transaction';
}