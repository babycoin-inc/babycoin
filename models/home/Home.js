const { query } = require('../../db/index.js');

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

exports.clearTransactions = async (user_id) => {
  try {
    const trades = await query(`DELETE FROM transactions WHERE trader_id = $1;`, [user_id]);
    return trades.rows;
  } catch (err) {
    console.error(err);
  }
};

exports.getTransactionHistory = async (user_id) => {
  try {
    const transactions = await query(`SELECT c.name, c.acronym, c.image, t.total_trade_coin, t.total_trade_fiat, t.purchase_price, t.order_type FROM transactions t INNER JOIN coins c ON c.id = t.coin_id WHERE trader_id = $1;`, [user_id]);
    return transactions.rows;
  } catch (err) {
    console.error(err);
  }
};

exports.resetPortfolio = async (user_id) => {
  try {
    const reset = await query(`DELETE FROM portfolio WHERE trader_id = $1;`, [user_id]);
    const startingCash = await query(`INSERT INTO portfolio(trader_id, coin_id, dollar_cost, avg_price, quantity) VALUES ($1, (SELECT id FROM coins WHERE acronym = 'usd'), 500, 1, 500);`, [user_id]);
    const clearAchievements = await query(`DELETE FROM trader_achievements WHERE trader_id = $1 AND achievement_id >= 2;`, [user_id]);
    return 'Reset Portfolio';
  } catch (err) {
    console.error(err);
  }
};