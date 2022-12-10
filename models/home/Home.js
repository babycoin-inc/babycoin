const { query } = require('../../db/index.js');

exports.calcAveragePrice = (id) => {

};

exports.calcDollarCost = (id) => {

};

exports.allCoins = async (user_id) => {
  const portfolio = await query(`SELECT json_build_object('coin', c.name, 'acronym', c.acronym, 'value', (p.quantity * c.latest_price), 'quantity', p.quantity, 'avg_entry', p.avg_price, 'curr_price', c.latest_price, 'profit_loss', ((p.quantity * c.latest_price) - p.dollar_cost), 'image', c.image) FROM coins c INNER JOIN portfolio p ON c.id = p.coin_id WHERE trader_id = $1;`, [user_id]);
  let formatted = portfolio.rows.map((coin) => {
    return coin.json_build_object;
  });
  return formatted;

  /* Data Return Shape
  [{
    coin: Bitcoin,
    acronym: BTC,
    value: 1122,
    quantity: 0.05,
    avg_entry: 1500,
    curr_price: 1700,
    profit_loss: 1022,
    image: 'url'
  }]
  */
};