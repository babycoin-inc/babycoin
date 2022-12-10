const {Trade} = require('../../../models/models.js')

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

exports.getCoin = (req, res) => {
  const name = req.query.name;
  const price = Trade.getCoin(name);
  res.send(JSON.stringify(price));
}

exports.insertBuyTransaction = (req, res) => {
  console.log('request.body: ', request.body);
  //req.body shape:
    // currency: 'USD',
    // purchase_price: price,
    // 'total_trade_coin': total_trade_coin,
    // 'total_trade_fiat': total_trade_fiat,
    // order_datetime: Date.now(),
    // user_id: 'Morgan',
    // coin_id: coin

  //db expects:
    // order_type transaction_type,
    // currency VARCHAR(10) NOT NULL,
    // purchase_price INTEGER NOT NULL,
    // total_trade_fiat INTEGER NOT NULL,
    // total_trade_coin INTEGER NOT NULL,
    // order_datetime timestamp,
    // user id => trader_id INTEGER REFERENCES trader(id),
    // coin_id INTEGER REFERENCES coins(id)
}

exports.insertSellTransaction = (req, res) => {
  //req.body shape:
    // currency: 'USD',
    // purchase_price: price,
    // 'total_trade_coin': total_trade_coin,
    // 'total_trade_fiat': total_trade_fiat,
    // order_datetime: Date.now(),
    // user_id: 'Morgan',
    // coin_id: coin

  //db expects:
    // order_type transaction_type,
    // currency VARCHAR(10) NOT NULL,
    // purchase_price INTEGER NOT NULL,
    // total_trade_fiat INTEGER NOT NULL,
    // total_trade_coin INTEGER NOT NULL,
    // order_datetime timestamp,
    // user id => trader_id INTEGER REFERENCES trader(id),
    // coin_id INTEGER REFERENCES coins(id)
}