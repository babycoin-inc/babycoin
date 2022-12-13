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

exports.fulfillBuyTransaction = (transaction) => {
  // Subtract total_trade_fiat from cash
  // add total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'Hit Fulfill Buy Transaction';
}

exports.fulfillSellTransaction = (transaction) => {
  // add total_trade_fiat from cash
  // subtract total_trade_coin to portfolio
  // calculations for dollar cost
  // calculations for avg price
  return 'Hit Fulfill Sell Transaction';
}