const {query} = require('../../db/index');

exports.deleteCoinsFromWatchlist = async (userId, coin) => {
  const params0 = [userId];
  const text0 = 'SELECT watchlist FROM trader_watchlist WHERE trader_id = $1';
  const result = await query(text0, params0);

  console.log('result.rows', result['rows']);
  return result['rows'];
}