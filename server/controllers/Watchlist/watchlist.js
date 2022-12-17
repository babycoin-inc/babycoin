const watchlist = require('../../../models/watchlist/Watchlist.js');

exports.removeFromWatchlist = (req, res) => {
  watchlist.deleteCoinsFromWatchlist(req.params['id'], req.params['coin'])
  .then(result => {
    res.send(result[0]['watchlist']);
  })
  .catch(err => res.send(err));
}
