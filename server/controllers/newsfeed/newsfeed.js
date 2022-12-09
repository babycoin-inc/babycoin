const client = require('/Users/alexyeung/Desktop/babycoin/db/index.js')

let runAPI = () => {

}

let getAll = (cb) => {
    client.query('SELECT * FROM newsfeed', (err, result) => {
      if(err) {
        console.log(err);
      } else {
        cb(result);
      }
    });
}
module.exports = {
  getAll,
  runAPI
}
