var {query} = require('../../db/index.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

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
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ADD INITIAL PORTION OF TRANSACTION HERE

    // Subtract total_trade_fiat and update dollar cost for CASH
    query(`UPDATE portfolio SET quantity = (quantity - $1), dollar_cost = (dollar_cost - $1) WHERE coin_id = (SELECT id FROM coins WHERE acronym = 'usd') AND trader_id = $2;`, [transaction.total_trade_fiat, user_id]);
    // add total_trade_coin to portfolio || Dollar Cost || Avg Price
    query(`INSERT INTO portfolio(trader_id, coin_id, dollar_cost, avg_price, quantity) VALUES($1, $2, $3, $4, $5) ON CONFLICT (trader_id, coin_id) DO UPDATE SET quantity = (portfolio.quantity + $5), dollar_cost = (portfolio.dollar_cost + $3), avg_price = ((portfolio.dollar_cost + $3) / (portfolio.quantity + $5)) WHERE portfolio.coin_id = $2 AND portfolio.trader_id = $1;`, [user_id, transaction.coin_id, transaction.total_trade_fiat, transaction.purchase_price, transaction.total_trade_coin]);
    await client.query('COMMIT');
    return 'Buy Transaction Completed';
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
  }
}

exports.fulfillSellTransaction = async (transaction) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ADD INITIAL PORTION OF TRANSACTION HERE

    // add total_trade_fiat from cash
    query(`UPDATE portfolio SET quantity = (quantity + $1), dollar_cost = (dollar_cost + $1) WHERE coin_id = (SELECT id FROM coins WHERE acronym = 'usd') AND trader_id = $2;`, [transaction.total_trade_fiat, user_id]);
    // subtract total_trade_coin to portfolio || Dollar Cost || Avg Price
    query(`UPDATE portfolio SET quantity = (quantity - $1), dollar_cost = (dollar_cost - ($1 * $2)), avg_price = (dollar_cost - ($1 * $2)) / (quantity - $1) WHERE coin_id = $3 AND trader_id = 1;`, [transaction.total_trade_coin, transaction.purchase_price, transaction.coin_id, user_id]);
    await client.query('COMMIT');
    return 'Hit Fulfill Sell Transaction';
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
  }
}