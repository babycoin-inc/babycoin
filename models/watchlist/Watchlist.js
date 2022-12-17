const {query} = require('../../db/index');

exports.deleteCoinsFromWatchlist = async (userId, deletedCoin) => {
  const params0 = [userId];
  const text0 = 'SELECT watchlist FROM trader_watchlist WHERE trader_id = $1';
  let result = await query(text0, params0);

  const arr = result['rows'][0]['watchlist'];

  for (const coin of arr) {
    if (coin === deletedCoin) {
      const text1 = 'UPDATE trader_watchlist SET watchlist = ( SELECT array_remove(watchlist, $1) FROM trader_watchlist WHERE trader_id = $2) WHERE trader_id = $2';
      const params1 = [deletedCoin, userId];
      await query(text1, params1);
    }
  }

  result = await query(text0, params0);
  return result['rows'];

}