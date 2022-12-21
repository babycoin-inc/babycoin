const {query} = require('../../db/index');

const addToWatchlist = async (addedList, trader_id) => {
  // console.log('added list', addedList);
  const params0 = [trader_id];
  const text0 = 'SELECT watchlist FROM trader_watchlist WHERE trader_id = $1';
  let result = await query(text0, params0);

  // if trader_watchlist table doesn't have this trader's info:
  const watchlistArray = addedList.map((coinObj) => {
    return coinObj.value;
  });

  console.log('watchlistArray-11111', watchlistArray);

  console.log("result['rows']front", result['rows']);

  if (result['rows'].length === 0) {
    console.log("result['rows']middle", result['rows']);
    // const text1 = `INSERT INTO trader_watchlist (trader_id, watchlist) VALUES ($1, ARRAY($2))`;
    // const params1 = [trader_id, watchlistArray];
    const promiseArray = watchlistArray.map((addedCoin, index) => {
      if (index === 0) {
        return query(`INSERT INTO trader_watchlist (trader_id, watchlist) VALUES ($1, array_append('{}', $2))`, [trader_id, addedCoin]);
      } else {
        return query(`UPDATE trader_watchlist SET watchlist = array_append(watchlist, $1) WHERE trader_id = $2`, [addedCoin, trader_id])
      }
    })

    // try{
    //   await query(text1, params1);
    // } catch(e) {
    //   console.log('query:addtowatchlist err', e);
    // }
    try {
      await Promise.all(promiseArray);
    } catch (err) {
      console.log('promise.all err', err);
    }
    console.log("result['rows']after", result['rows']);
  }


  // if it already has this trader's watchlist:
  addedList.map(async (coin) => {
    const name = coin.value;
    const params2 = [name, trader_id];
    console.log(result['rows'][0]['watchlist'], 'halhlahlhd;a')
    if (!result['rows'][0]['watchlist'].includes(name)) {
      const text2 = `UPDATE trader_watchlist SET watchlist = array_append(watchlist, $1) WHERE trader_id = $2`;
      await query(text2, params2);
    }
  })

  result = await query(text0, params0);
  return result['rows'];
}

exports.addToWatchlist = addToWatchlist;