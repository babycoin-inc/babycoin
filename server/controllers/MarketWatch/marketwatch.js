require('dotenv').config();
const models = require('../../../models/marketWatch/marketWatch.js');
const axios = require('axios');

exports.getCoins = (req, res) => {
  // get all crypto coins
  return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,polkadot,tether,binancecoin,cardano,dogecoin,ripple,solana&order=market_cap_desc&per_page=12&page=1&sparkline=false',
  {
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
  })
 .then(result => {
    res.send(result.data);
  })
  .catch(error => {
    res.send(error);
  })
}