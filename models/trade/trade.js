var {query} = require('../../db/index.js');

exports.getTransactions = (id) => {

};

exports.insertTransaction = (transaction) => {
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
