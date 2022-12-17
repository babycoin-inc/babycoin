const dropdown = require('../../../models/dropDown/DropDown.js');

exports.addToWatchlist = (req, res) => {
  // console.log('request body', req.body.addedList, 'request params id', req.params.id);
  dropdown.addToWatchlist(req.body.addedList, req.params.id)
  .then(result => {
    // result[0]['watchlist'] looks like : [
                    //     "Polygon",
                    //     "Sol",
                    //     "Bitcoin",
                    //     "usdt",
                    //     "dot"
                    // ]
    res.send(result[0]['watchlist']).status(201);
  })
  .catch(err => res.send(err));
}