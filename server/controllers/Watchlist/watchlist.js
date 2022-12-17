const watchlist = require('../../../models/watchlist/Watchlist.js');

exports.removeFromWatchlist = (req, res) => {
  watchlist.deleteCoinsFromWatchlist(req.params['id'], req.params['coin'])
  .then(result => {
    console.log('result!!!', result[0]['watchlist']);
    res.send(result[0]['watchlist']);
  })
  .catch(err => res.send(err));
}
