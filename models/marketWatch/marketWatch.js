const {query} = require('../../db/index');

exports.writeCoins = (coins) => {
  coins.forEach((coin) => {
    const name = coin.name;
    const acronym = coin.symbol;
    const coin_image = coin.image;
    const latest_price = coin.current_price;
    const text = `INSERT INTO coins (name, acronym, image, latest_price)
                  VALUES ('${name}', '${acronym}', '${coin_image}', ${latest_price})`;
    query(text);
  })
}