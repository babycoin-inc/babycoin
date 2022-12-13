require('dotenv').config();
const marketWatch = require('../../../models/marketWatch/marketWatch.js');
const axios = require('axios');

const updateCoins = () => {
  // console.log('Check if getting into updateCoins function!!!!');
  return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,polkadot,tether,binancecoin,cardano,dogecoin,ripple,solana&order=market_cap_desc&per_page=12&page=1&sparkline=false',
  {
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
  })
 .then(result => {
    // console.log('crypto coins gotten from the api', result.data);
    return marketWatch.writeCoins(result.data);
  })
  // .then(output => {
  //   // console.log('CONTROLLERS/marketWatch: running a task every 30 seconds');
  //   return "Coins successfully updated"  })
  .catch(error => {
    console.log(error);
  })
}

exports.updateCoins = updateCoins;

exports.getCoins = async (req, res) => {
  // console.log('Controllers/MarketWatch: getCoins WORKING');
  var resolved = await updateCoins();
  res.send(resolved);
}


// // Original one before seperated into two functions:
// exports.getCoins = (req, res) => {
//   get all crypto coins
//   console.log('GETCOINS!!!!');
//   return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,polkadot,tether,binancecoin,cardano,dogecoin,ripple,solana&order=market_cap_desc&per_page=12&page=1&sparkline=false',
//   {
//     headers: { "Accept-Encoding": "gzip,deflate,compress" }
//   })
//  .then(result => {
//     // marketWatch.writeCoins(result.data);
//     // res.send(result.data);
//     // const output = await marketWatch.writeCoins(result.data);

//     // console.log('MMMMMMM', output);
//     // res.send(output);
//     // console.log('getCoins', result.data);
//     return marketWatch.writeCoins(result.data);
//   })
//   .then(output => {
//     console.log('CONTROLLERS: running a task every 30 seconds');
//     res.send(output);
//   })
//   .catch(error => {
//     console.log(error);
//     res.status(500).send('Error');
//   })
// }


