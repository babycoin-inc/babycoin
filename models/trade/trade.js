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






exports.fulfillBuyTransaction = async (transaction, user_id) => {
  // Subtract total_trade_fiat and update dollar cost for CASH
  query(`UPDATE portfolio SET quantity = (quantity - $1), dollar_cost = (dollar_cost - $1) WHERE coin_id = $2 AND trader_id = $3;`, [transaction.total_trade_fiat, transaction.coin_id, user_id]);
  // add total_trade_coin to portfolio || Dollar Cost || Avg Price
  query(`INSERT INTO portfolio(trader_id, coin_id, dollar_cost, avg_price, quantity) VALUES($1, $2, $3, $4, $5) ON CONFLICT (trader_id, coin_id) DO UPDATE SET quantity = (portfolio.quantity + $5), dollar_cost = (portfolio.dollar_cost + $3), avg_price = ((portfolio.dollar_cost + $3) / (portfolio.quantity + $5)) WHERE portfolio.coin_id = $2 AND portfolio.trader_id = $1;`, [user_id, transaction.coin_id, transaction.total_trade_fiat, transaction.purchase_price, transaction.total_trade_coin]);

  return 'Hit Fulfill Buy Transaction';
}

exports.fulfillSellTransaction = (transaction, user_id) => {
  // add total_trade_fiat from cash
  // subtract total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'Hit Fulfill Sell Transaction';
}