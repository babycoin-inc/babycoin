var {query} = require('../../db/index.js');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

exports.getCoin = (coinName) => {
  const price = getRandomArbitrary(15000, 20000);
  return price;
}

exports.updatePrice = (coin, price) => {
  const values = [coin, price];
  query(`UPDATE coins SET latest_price=$2 WHERE name=$1`, [values])
    .then((result) => {
      console.log('result from coins query: ', result);
      return result;
    })
    .catch((err)=> {throw err;})
}

exports.getTransactions = (id) => {

};

const insertTransaction = (transaction, orderType) => {
  let {coinName} = transaction;
  const values = [coinName];
  return query(`select id from coins WHERE name=$1`, values)
    .then((result) => {
      const coin_id = result.rows[0].id;
      const { currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id } = transaction;
      const recordToCreate = [orderType, currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id, coin_id];
      return query('insert into transactions (order_type, currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id, coin_id) values ($1, $2, $3, $4, $5, $6, $7)', recordToCreate)
        .then((fulfilledTransaction) => {
          return 'Transaction created';
        })
        .catch((err) => { throw err; })
    })
    .catch((err) => { throw err; })
}

exports.insertBuyTransaction = async(transaction) => {
  var result = await insertTransaction(transaction, 'buy');
  return result;
};

exports.insertSellTransaction = async(transaction) => {
  var result = await insertTransaction(transaction, 'sell');
  return result;
};

exports.fulfillBuyTransaction = async (transaction, user_id) => {
  // Subtract total_trade_fiat and update dollar cost for CASH
  query(`UPDATE portfolio SET quantity = (quantity - $1), dollar_cost = (dollar_cost - $1) WHERE coin_id = (SELECT id FROM coins WHERE acronym = 'usd') AND trader_id = $2;`, [transaction.total_trade_fiat, user_id]);
  // add total_trade_coin to portfolio || Dollar Cost || Avg Price
  query(`INSERT INTO portfolio(trader_id, coin_id, dollar_cost, avg_price, quantity) VALUES($1, $2, $3, $4, $5) ON CONFLICT (trader_id, coin_id) DO UPDATE SET quantity = (portfolio.quantity + $5), dollar_cost = (portfolio.dollar_cost + $3), avg_price = ((portfolio.dollar_cost + $3) / (portfolio.quantity + $5)) WHERE portfolio.coin_id = $2 AND portfolio.trader_id = $1;`, [user_id, transaction.coin_id, transaction.total_trade_fiat, transaction.purchase_price, transaction.total_trade_coin]);

  return 'Hit Fulfill Buy Transaction';
}

exports.fulfillSellTransaction = (transaction) => {
  // add total_trade_fiat from cash
  query(`UPDATE portfolio SET quantity = (quantity + $1), dollar_cost = (dollar_cost + $1) WHERE coin_id = (SELECT id FROM coins WHERE acronym = 'usd') AND trader_id = $2;`, [transaction.total_trade_fiat, user_id]);
  // subtract total_trade_coin to portfolio || Dollar Cost || Avg Price
  query(`UPDATE portfolio SET quantity = (quantity - $1), dollar_cost = (dollar_cost - ($1 * $2)), avg_price = (dollar_cost - ($1 * $2)) / (quantity - $1) WHERE coin_id = $3 AND trader_id = 1;`, [transaction.total_trade_coin, transaction.purchase_price, transaction.coin_id, user_id]);
  return 'Hit Fulfill Sell Transaction';
}