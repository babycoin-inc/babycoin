const dropdown = require('../../../models/dropDown/DropDown.js');

exports.addToWatchlist = (req, res) => {
  // console.log('req.body.addedList', req.body.addedList);
  dropdown.addToWatchlist(req.body.addedList, req.params.id)
  .then(result => {
    res.send(result[0]['watchlist']).status(201);
  })
  .catch(err => res.send(err));
}