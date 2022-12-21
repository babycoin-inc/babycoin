const {query} = require('../../db/index');


exports.writeCoins = async (coins) => {
  const text0 = `SELECT * FROM coins`;

  try {
    let result = await query(text0);
    if (result['rows'].length === 0) {

    const textUsd = `INSERT INTO coins (name, acronym, image, latest_price, price_change_percentage)
    VALUES ('United States Dollar', 'usd', 'https://res.cloudinary.com/dc3r923zh/image/upload/v1671498243/boc/DALL_E-usd_eaaefm.png', 1, 0)`;

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
      const price_change_percentage = coin.price_change_percentage_24h;

      const params = [name, acronym, coin_image, latest_price, price_change_percentage];

      const textEachCoin = `INSERT INTO coins (name, acronym, image, latest_price, price_change_percentage)
                            VALUES ($1, $2, $3, $4, $5)`;
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
      const price_change_percentage = coin.price_change_percentage_24h;

      const params = [name, latest_price, price_change_percentage];

      const textUpdate = `UPDATE coins SET latest_price = $2, price_change_percentage = $3 WHERE name = $1`;
      return query(textUpdate, params);
    })

    try {
      await Promise.all(promiseArray);
    } catch (err) {
      console.log('promise.all error', err);
    }
  }

  result = await query(text0);
  return result['rows'];


 } catch (err) {
  console.log(err);
}

}