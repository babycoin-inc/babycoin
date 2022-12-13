const {query} = require('../../db/index');


exports.writeCoins = async (coins) => {
  const text0 = `SELECT * FROM coins`;

  try {
    let result = await query(text0);
    if (result['rows'].length === 0) {

      const textUsd = `INSERT INTO coins (name, acronym, image, latest_price)
                       VALUES ('United States Dollar', 'usd', 'https://en.wikipedia.org/wiki/United_States_one-dollar_bill#/media/File:US_one_dollar_bill,_obverse,_series_2009.jpg', 1)`;

      try {
        await query(textUsd);
      } catch (err) {
        console.log(err);
      }

    const promiseArray = coins.map((coin) => {
      const name = coin.name;
      const acronym = coin.symbol;
      const coin_image = coin.image;
      const latest_price = coin.current_price;

      const params = [name, acronym, coin_image, latest_price]

      const textEachCoin = `INSERT INTO coins (name, acronym, image, latest_price)
                            VALUES ($1, $2, $3, $4)`;
      return query(textEachCoin, params);
    })

    try {
      await Promise.all(promiseArray);
    } catch (err) {
      console.log(err);
    }

  } else {
    const promiseArray = coins.map((coin) => {
      const name = coin.name;
      const latest_price = coin.current_price;

      const params = [name, latest_price];

      const textUpdate = `UPDATE coins SET latest_price = $2 WHERE name = $1`;
      return query(textUpdate, params);
    })

    try {
      await Promise.all(promiseArray);
    } catch (err) {
      console.log('promise.all error');
      console.log(err);
    }
  }

  result = await query(text0);
  return result['rows'];


 } catch (err) {
  console.log(err);
}

}