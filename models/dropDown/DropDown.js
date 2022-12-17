const {query} = require('../../db/index');

const addToWatchlist = async (addedList, trader_id) => {
  const params0 = [trader_id];
  const text0 = 'SELECT watchlist FROM trader_watchlist WHERE trader_id = $1';
  let result = await query(text0, params0);

  // if trader_watchlist table doesn't have this trader's info:
  const watchlistArray = addedList.map((coinObj) => {
    return coinObj.value;
  });

  if (result['rows'].length === 0) {
    const text1 = `INSERT INTO trader_watchlist (trader_id, watchlist) VALUES ($1, $2)`;
    const params1 = [trader_id, watchlistArray];
    await query(text1, params1);
  }

  // if it already has this trader's watchlist:
  addedList.map(async (coin) => {
    const name = coin.value;
    const params2 = [name, trader_id];

    if (!result['rows'][0]['watchlist'].includes(name)) {
      const text2 = `UPDATE trader_watchlist SET watchlist = array_append(watchlist, $1) WHERE trader_id = $2`;
      await query(text2, params2);
    }
  })

  result = await query(text0, params0);
  return result['rows'];
}

exports.addToWatchlist = addToWatchlist;

// addedList looks like:
  // [
  //   { value: 'Ethereum', label: 'Ethereum' },
  //   { value: 'Xrp', label: 'Xrp' }
  // ]
// watchlist looks like:
  // ['Bitcoin', 'Polygon']