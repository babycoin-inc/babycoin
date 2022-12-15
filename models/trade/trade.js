var {query} = require('../../db/index.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

const insertTransaction = (transaction, orderType) => {
  const { currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id, coin_id } = transaction;
  const recordToCreate = [orderType, currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id, coin_id];
  return query('insert into transactions (order_type, currency, purchase_price, total_trade_fiat, total_trade_coin, order_datetime, trader_id, coin_id) values ($1, $2, $3, $4, $5, now() , $6, $7)', recordToCreate)
    .then((fulfilledTransaction) => {
      return 'Transaction created';
    })
    .catch((err) => { throw err; })
}

exports.fulfillBuyTransaction = async (transaction, user_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ADD INITIAL PORTION OF TRANSACTION HERE
    const buyOrder = await insertTransaction(transaction, 'buy');
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

exports.fulfillSellTransaction = async (transaction, user_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ADD INITIAL PORTION OF TRANSACTION HERE
    const sellOrder = await insertTransaction(transaction, 'sell');
    // add total_trade_fiat from cash
    query(`UPDATE portfolio SET quantity = (quantity + $1), dollar_cost = (dollar_cost + $1) WHERE coin_id = (SELECT id FROM coins WHERE acronym = 'usd') AND trader_id = $2;`, [transaction.total_trade_fiat, user_id]);
    // subtract total_trade_coin to portfolio || Dollar Cost || Avg Price
    query(`UPDATE portfolio SET quantity = (quantity - $1), dollar_cost = (dollar_cost - ($1 * $2)), avg_price = (dollar_cost - ($1 * $2)) / (quantity - $1) WHERE coin_id = $3 AND trader_id = $4;`, [transaction.total_trade_coin, transaction.purchase_price, transaction.coin_id, user_id]);
    await client.query('COMMIT');
    return 'Hit Fulfill Sell Transaction';
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
  }
}