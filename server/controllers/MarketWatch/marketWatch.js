require('dotenv').config();
const marketWatch = require('../../../models/marketWatch/marketWatch.js');
const axios = require('axios');

const updateCoins = () => {
  return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,polkadot,tether,binancecoin,cardano,dogecoin,ripple,solana&order=market_cap_desc&per_page=12&page=1&sparkline=false',
  {
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
  })
 .then(result => {
    console.log('update the coins table every 30s');
    return marketWatch.writeCoins(result.data);
  })
  .catch(error => {
    console.log(error);
  })
}


exports.getCoins = async(req, res) => {
  try {
    var resolved = await updateCoins();
    res.send(resolved);
  } catch (err) {
    console.log('controllers/marketWatch/getCoins Error', err);
  }
}


exports.updateCoins = updateCoins;

