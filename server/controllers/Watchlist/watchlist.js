const watchlist = require('../../../models/watchlist/Watchlist.js');

exports.removeFromWatchlist = (req, res) => {
  watchlist.deleteCoinsFromWatchlist(req.params['id'], req.params['coin'])
  .then(result => {
    res.send(result[0]['watchlist']);
  })
  .catch(err => res.send(err));
}

exports.clearWatchlist = (req, res) => {
  watchlist.emptyWatchlist(req.params['id'])
  .then(result => {
    res.send('Successfully cleaned the trader_watchlist table!');
  })
  .catch(err => res.send('ERROR: Failed to clean the trader_watchlist table!'));
}