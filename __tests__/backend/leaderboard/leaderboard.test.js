require("dotenv").config();
const { query } = require('../../../db/index.js');
const { Leaderboard } = require('../../../models/models.js');

const TEST_FIRSTID = 900000000;
const TEST_DOLLARCOST = 1000000;
const TEST_AVGPRICE = 1000000;

const TEST_CURRENT_REALIZED = 'current_realized_gains';
const TEST_ALLTIME_REALIZED = 'alltime_realized_gains'

const USD = 1;
const BTC = 2;
const ETH = 3;
const BNB = 4;
const USDT = 5;
const DOGE = 6;
const ADA = 7;
const DOT = 8;
const XRP = 9;
const SOL = 10;

const setUpTestLeaderboardDB = async () => {

  for (var i = 1; i <= 10; i++) {
    let q =
      `INSERT INTO trader (id, username) values (${i + TEST_FIRSTID}, 'leaderboardTester${i}');`;
    try {
      const resp = await query(q);
      // console.log(resp);
    } catch (err) {
      console.log('error', err);
    }

  }

  for (var i = 1; i <= 10; i++) {
    for (var o = 1; o <= 10; o++) {
      let q =
        `INSERT INTO portfolio (trader_id, coin_id, dollar_cost, avg_price, quantity) values (${i + TEST_FIRSTID},${o},${TEST_DOLLARCOST},${TEST_AVGPRICE},9999999999);`;
      try {
        const resp = await query(q);
        // console.log(resp);
      } catch (err) {
        console.log('error', err);
      }
    }
  }



}

const cleanTestLeaderboardDB = async () => {
  try {
    let q =
      `
      DELETE FROM leaderboard WHERE trader_id > ${TEST_FIRSTID};
      DELETE FROM transactions WHERE trader_id > ${TEST_FIRSTID};
      DELETE FROM portfolio WHERE trader_id> ${TEST_FIRSTID};
      DELETE FROM trader WHERE id> ${TEST_FIRSTID};
      `;
    const resp = await query(q);
  } catch (err) {
    console.log('error', err);
  }


}

describe("Leaderboard Test", () => {
  beforeAll(() => {
    return setUpTestLeaderboardDB();
  });

  afterAll(() => {
    return cleanTestLeaderboardDB();
    // done();
  });

  test("leaderboardTester1 sold BTC at a GAIN of $100,000 and is ranked #1 in USD", async () => {
    let q =
      `insert into transactions (order_type, currency, purchase_price, total_trade_fiat, total_trade_coin,
        order_datetime,trader_id,coin_id) VALUES ('sell', 'TEST_DUMMY', ${TEST_DOLLARCOST + 100000}, ${TEST_DOLLARCOST + 100000}, 1, current_timestamp, ${1 + TEST_FIRSTID},${BTC});`
    try {
      const resp = await query(q);
      // console.log(resp);
    } catch (err) {
      console.log('error', err);
    }


    const leaderboard = await Leaderboard.getLeaderboard();
    expect(leaderboard).toEqual(
      [
        [
          {
            "idcount": "1"
          }
        ],
        [
          {
            id: 900000001,
            username: 'leaderboardTester1',
            coin: 'usd',
            current_realized_gains: '100000.00',
            row_number: '1'
          }
        ]
      ]
    )
  });


  test("leaderboardTester2 sold ETH at a GAIN of $50,000 and is ranked #2 in USD", async () => {
    let q =
      `insert into transactions (order_type, currency, purchase_price, total_trade_fiat, total_trade_coin,
        order_datetime,trader_id,coin_id) VALUES ('sell', 'TEST_DUMMY', ${TEST_DOLLARCOST + 50000},  ${TEST_DOLLARCOST + 50000}, 1, current_timestamp, ${2 + TEST_FIRSTID},${ETH});`
    try {
      const resp = await query(q);
      // console.log(resp);
    } catch (err) {
      console.log('error', err);
    }


    const leaderboard = await Leaderboard.getLeaderboard();
    expect(leaderboard).toEqual(
      [
        [
          {
            idcount: "2"
          }
        ],
        [
          {

            id: 900000001,
            username: 'leaderboardTester1',
            coin: 'usd',
            current_realized_gains: '100000.00',
            row_number: '1'
          },
          {
            id: 900000002,
            username: 'leaderboardTester2',
            coin: 'usd',
            current_realized_gains: '50000.00',
            row_number: '2'
          }
        ]
      ]
    );
  });


  test("leaderboardTester1 sold XRP at a LOSS of $25,000 and is ranked #1 in USD", async () => {
    let q =
      `insert into transactions (order_type, currency, purchase_price, total_trade_fiat, total_trade_coin,
        order_datetime,trader_id,coin_id) VALUES ('sell', 'TEST_DUMMY', ${TEST_DOLLARCOST - 25000},  ${TEST_DOLLARCOST - 25000}, 1, current_timestamp, ${1 + TEST_FIRSTID},${XRP});`
    try {
      const resp = await query(q);
      // console.log(resp);
    } catch (err) {
      console.log('error', err);
    }


    const leaderboard = await Leaderboard.getLeaderboard();
    expect(leaderboard).toEqual(
      [
        [
          {
            idcount: "2"
          }
        ],
        [
          {

            id: 900000001,
            username: 'leaderboardTester1',
            coin: 'usd',
            current_realized_gains: '75000.00',
            row_number: '1'
          },
          {
            id: 900000002,
            username: 'leaderboardTester2',
            coin: 'usd',
            current_realized_gains: '50000.00',
            row_number: '2'
          }
        ]
      ]
    );
  });
});