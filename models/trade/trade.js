var {query} = require('../../db/index.js');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

exports.getCoin = (coinName) => {
  const price = getRandomArbitrary(15000, 20000);
  return price;
}

// exports.getCoin = (coin) => {
//   const values = [coin];
//   query(`SELECT latest_price FROM COINS WHERE NAME=$1`, [values[0]])
//     .then((result) => {
//       console.log('result from coins query: ', result);
//       return result;
//     })
//     .catch((err)=> {throw err;})
// }

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

exports.insertBuyTransaction = (transaction) => {
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

exports.insertSellTransaction = (transaction) => {
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