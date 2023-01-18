require("dotenv").config();
const { query, end, clientRelease } = require('../../../db/index.js');
const { Trade } = require('../../../models/models.js');

const user_id = 1;
const setUpDB = async() => {
  let purgeDBQuery =
  `DELETE FROM TRANSACTIONS WHERE trader_id = 1;
  DELETE FROM PORTFOLIO WHERE trader_id = 1;`
  await query(purgeDBQuery, []);
  const addCashQuery =
  `INSERT INTO portfolio(trader_id, coin_id, dollar_cost, avg_price, quantity) VALUES ($1, 1, 500, 1, 500);`;
  await query(addCashQuery, [user_id]);

}

beforeEach(() => {
  return setUpDB();
})

// afterEach(async () => {
//   // await clientRelease();
//   const killConnection = await end();
// })

describe('buy all and sell all', () => {
  test('use remaining USD to buy a coin', async () => {
    let transaction = {
      coin_id: 10,
      currency: 'usd',
      purchase_price: 4.63,
      total_trade_coin: 107.991360691,
      total_trade_fiat: 500,
      trader_id: user_id,
    }
    //insert a transaction using query
    const result = await Trade.fulfillBuyAllTransaction(transaction, 1);
    const sql = `SELECT * FROM TRANSACTIONS WHERE trader_id = ${user_id};`
    const transactions = await query(sql, []);
    const { order_type, currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id, coin_id } = transactions.rows[0];

    //expect the inserted transaction to contain the expected fields passed from const transaction
    expect(order_type).toBe('buy');
    expect(currency).toBe('usd');
    expect(purchase_price).toBe('4.63');
    expect(total_trade_coin).toBe('107.991360691');
    expect(total_trade_fiat).toBe('500');
    expect(trader_id).toBe(1);
    expect(coin_id).toBe(10);
    //expect the portfolio to have cash of 0 and coin balance of 500
    const getPortfolio = `SELECT * FROM PORTFOLIO WHERE trader_id = ${user_id};`
    const res = await query(getPortfolio, []);
    console.log(res.rows)
    expect(res.rows[0]).toEqual(expect.objectContaining({
      trader_id: 1,
      coin_id: 1,
      dollar_cost: '0',
      avg_price: '1',
      quantity: '0'
    }))
    expect(res.rows[1]).toEqual(expect.objectContaining({
      trader_id: 1,
      coin_id: 10,
      dollar_cost: '500',
      avg_price: '4.63',
      quantity: '107.991360691'
    }))
  })

  test('sell all of a coin', async () => {
    let transaction1 = {
      coin_id: 6,
      currency: 'usd',
      purchase_price: 0.26928,
      total_trade_coin: 928.401663696,
      total_trade_fiat: 250,
      trader_id: user_id,
    }
    //insert a transaction using query
    const result1 = await Trade.fulfillBuyTransaction(transaction1, user_id);
    const sql1 = `SELECT * FROM TRANSACTIONS WHERE trader_id = ${user_id};`
    const transactions1 = await query(sql1, []);
    let { order_type, currency, purchase_price, total_trade_fiat, total_trade_coin, trader_id, coin_id } = transactions1.rows[0];

    let transaction2 = {
      coin_id: 6,
      currency: 'usd',
      purchase_price: 0.26928,
      total_trade_coin: 928.401663696,
      total_trade_fiat: 250,
      trader_id: user_id,
    }
    //insert a transaction using query
    const result2 = await Trade.fulfillSellAllTransaction(transaction2, user_id);
    const sql2 = `SELECT * FROM TRANSACTIONS WHERE trader_id = ${user_id};`
    const transactions2 = await query(sql2, []);
    //expect the portfolio to have cash of 0 and coin balance of 500
    const getPortfolio = `SELECT * FROM PORTFOLIO WHERE trader_id = ${user_id};`
    const res = await query(getPortfolio, []);
    console.log(res.rows)
    expect(res.rows.length).toBe(1);
    expect(res.rows[0]).toEqual(expect.objectContaining({
      trader_id: 1,
      coin_id: 1,
      dollar_cost: '500',
      avg_price: '1',
      quantity: '500'
    }))
  })
})

/* Transaction TEST CASES
1. Use all USD to buy one coin
2. Sell all of one coin

3. Buy coin1 w/ portion of cash
4. Sell partial of coin1

5. Failed portfolio update should rollback transaction
*/