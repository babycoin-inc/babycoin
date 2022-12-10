const {query} = require('../../db/index');

exports.writeCoins = (coins) => {
  coins.forEach((coin) => {
    // console.log('coin', coin);
    const name = coin.name;
    // const acronym = coin.symbol;
    // const coin_image = coin.image;
    const latest_price = coin.current_price;
    console.log('latest_price', latest_price);
    // const text = `INSERT INTO coins (name, acronym, image, latest_price)
    //               VALUES ('${name}', '${acronym}', '${coin_image}', ${latest_price})`;
    const text = `UPDATE coins SET latest_price = ${latest_price} WHERE name = '${name}'`;
    query(text);
  })
}