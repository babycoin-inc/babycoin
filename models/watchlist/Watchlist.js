const {query} = require('../../db/index');

exports.deleteCoinsFromWatchlist = async (userId, deletedCoin) => {
  const params0 = [userId];
  const text0 = 'SELECT watchlist FROM trader_watchlist WHERE trader_id = $1';
  const result = await query(text0, params0);

  const arr = result['rows'][0]['watchlist'];

  // arr.forEach( async (coin, index) => {
  //   if (coin === deletedCoin) {
  //     const text1 = 'UPDATE trader_watchlist SET watchlist = ( SELECT array_remove(watchlist, $1) FROM trader_watchlist WHERE trader_id = $2) WHERE trader_id = $2';
  //     const params1 = [deletedCoin, userId];
  //     await query(text1, params1);
  //   }
  // })

  const promiseArray = arr.map(coin => {
    if (coin === deletedCoin) {
      const text1 = 'UPDATE trader_watchlist SET watchlist = ( SELECT array_remove(watchlist, $1) FROM trader_watchlist WHERE trader_id = $2) WHERE trader_id = $2';
      const params1 = [deletedCoin, userId];
      return query(text1, params1);
    } else {
      return coin;
    }
  })

  try {
    await Promise.all(promiseArray);
  } catch (err) {
    console.log('promise.all error');
  }

  try {
    result = await query(text0, params0);
  } catch (err) {
    console.log('promise error');
  }

  return result['rows'];
}