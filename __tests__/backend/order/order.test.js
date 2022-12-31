require("dotenv").config();
const { query } = require('../../../db/index.js');
const { Trade } = require('../../../models/models.js');

// const trader_id = 1;
// const transaction = {
//   coin_id: coin.id,
//   currency: 'usd',
//   purchase_price: Number(coin.latest_price),
//   total_trade_coin: total_trade_coin,
//   total_trade_fiat: total_trade_fiat,
//   trader_id: authenticatedUser,
// }

describe('dummy test', () => {
  test('adds 2 + 4 to equal 6', () => {

    expect(sum(2, 4)).toBe(6)
  })
})

//try querying transaction table

/* Transaction TEST CASES
Use all USD to buy one coin
Sell all of one coin

Buy coin1 w/ portion of cash
Buy coin1 w/ portion of cash
Buy coin2 w/ portion of cash
Sell partial of coin1
*/