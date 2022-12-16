const dropdown = require('../../../models/dropDown/DropDown.js');

exports.addToWatchlist = (req, res) => {
  // console.log('request body', req.body.addedList, 'request params id', req.params.id);
  dropdown.addToWatchlist(req.body.addedList, req.params.id)
  .then(result => {
    res.send('add to watchlist successfully');
  })
  .catch(err => res.send(err));
}