const { query } = require('../../db/index.js');

exports.calcAveragePrice = (id) => {

};

exports.calcDollarCost = (id) => {

};

exports.allCoins = async (user_id) => {
  const portfolio = await query(`SELECT json_build_object('coin', c.name, 'acronym', c.acronym, 'value', (p.quantity * c.latest_price), 'quantity', p.quantity, 'avg_entry', p.avg_price, 'curr_price', c.latest_price, 'profit_loss', ((p.quantity * c.latest_price) - p.dollar_cost), 'dollar_cost', p.dollar_cost, 'percent_change', ((((p.quantity * c.latest_price) - p.dollar_cost) / p.dollar_cost)*100), 'image', c.image) FROM coins c INNER JOIN portfolio p ON c.id = p.coin_id WHERE trader_id = $1;`, [user_id]);
  let formatted = portfolio.rows.map((coin) => {
    return coin.json_build_object;
  });
  return formatted;

  /* Data Return Shape
  [{
    coin: Bitcoin,
    acronym: BTC,
    value: 113.3339,
    quantity: 0.00666667,
    avg_entry: 15000,
    curr_price: 17000,
    profit_loss: 13.33339,
    dollar_cost: 100,
    percent_change: 13.33339
    image: 'url'
  }]
  */
};

exports.clearTradeHistory = async (user_id) => {
  const trades = await query(`DELETE FROM transactions WHERE trader_id = $1;`, [user_id]);
  return trades.rows;
};