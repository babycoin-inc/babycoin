const {query} = require('../../db/index');

exports.writeCoins = async (coins) => {
  const text0 = `SELECT * FROM coins`;
  let result = await query(text0);
  // console.log(result['rows']);

  if (result['rows'].length === 0) {

    const textUsd = `INSERT INTO coins (name, cronym, image, latest_price)
                     VALUES ('United States Dollar', 'usd', 'https://en.wikipedia.org/wiki/United_States_one-dollar_bill#/media/File:US_one_dollar_bill,_obverse,_series_2009.jpg', 1)`;
    await query(textUsd);

    coins.forEach(async (coin) => {
      const name = coin.name;
      const acronym = coin.symbol;
      const coin_image = coin.image;
      const latest_price = coin.current_price;

      const textEachCoin = `INSERT INTO coins (name, acronym, image, latest_price)
                     VALUES ('${name}', '${acronym}', '${coin_image}', ${latest_price})`;
      await query(textEachCoin);
    })
  } else {
    coins.forEach(async (coin) => {
      // const {name, acronym, coin_image, latest_price} = coin.name;
      const name = coin.name;
      const acronym = coin.symbol;
      const coin_image = coin.image;
      const latest_price = coin.current_price;

      const textUpdate = `UPDATE coins SET latest_price = ${latest_price} WHERE name = '${name}'`;
      await query(textUpdate);
    })
  }

  result = await query(text0);
  console.log('WWWWW', result['rows']);
  return result['rows'];




  // coins.forEach((coin) => {
  //   const name = coin.name;
  //   const acronym = coin.symbol;
  //   const coin_image = coin.image;
  //   const latest_price = coin.current_price;

  //   if (query(text0).rows.length === 0)
  //   const text1 = `INSERT INTO coins (name, acronym, image, latest_price)
  //                 VALUES ('${name}', '${acronym}', '${coin_image}', ${latest_price})`;

  //   const text2 = `UPDATE coins SET latest_price = ${latest_price} WHERE name = '${name}'`;
  //   query(text);
  // })
}