require('dotenv').config();
const marketWatch = require('../../../models/marketWatch/marketWatch.js');
const axios = require('axios');

exports.getCoins = (req, res) => {
  // get all crypto coins
  return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,polkadot,tether,binancecoin,cardano,dogecoin,ripple,solana&order=market_cap_desc&per_page=12&page=1&sparkline=false',
  {
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
  })
 .then(async result => {
    // marketWatch.writeCoins(result.data);
    // res.send(result.data);
    const output = await marketWatch.writeCoins(result.data);

    console.log('MMMMMMM', output);
    res.send(output);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send('Error');
  })
}



