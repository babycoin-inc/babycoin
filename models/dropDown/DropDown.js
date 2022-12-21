const {query} = require('../../db/index');

const addToWatchlist = async (addedList, trader_id) => {
  const params0 = [trader_id];
  const text0 = 'SELECT watchlist FROM trader_watchlist WHERE trader_id = $1';
  let result = await query(text0, params0);

  const watchlistArray = addedList.map((coinObj) => {
    return coinObj.value;
  });

  if (result['rows'].length === 0) {

    const promiseArray = watchlistArray.map((addedCoin, index) => {
      if (index === 0) {
        return query(`INSERT INTO trader_watchlist (trader_id, watchlist) VALUES ($1, array_append('{}', $2))`, [trader_id, addedCoin]);
      } else {
        return query(`UPDATE trader_watchlist SET watchlist = array_append(watchlist, $2) WHERE trader_id = $1`, [trader_id, addedCoin])
      }
    })

    try {
      await Promise.all(promiseArray);
    } catch (err) {
      console.log('promise.all err', err);
    }

  } else {
    const promiseArray = addedList.map((coin) => {
      const name = coin.value;
      const params2 = [name, trader_id];
      if (!result['rows'][0]['watchlist'].includes(name)) {
        const text2 = `UPDATE trader_watchlist SET watchlist = array_append(watchlist, $1) WHERE trader_id = $2`;
        return query(text2, params2);
      }
    })

    try {
      await Promise.all(promiseArray);
    } catch (err) {
      console.log('promise.all err', err);
    }
  }



  result = await query(text0, params0);
  return result['rows'];
}

exports.addToWatchlist = addToWatchlist;