const watchlist = require('../../../models/watchlist/Watchlist.js');

exports.removeFromWatchlist = (req, res) => {
  console.log(req.params); // { id: '1', coin: 'Ethereum' }
  watchlist.deleteCoinsFromWatchlist(req.params['id'], req.params['coin'])
  .then(result => {
    console.log('result', result);
    res.send('haha');
  })
  .catch(err => res.send(err));
}
