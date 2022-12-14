require('dotenv').config();
const newsfeed = require('../../../models/models.js');


module.exports.runAPI = (req, res) => {
  newsfeed.Newsfeed.runAPI((err,result) => {
    if(err){
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  })
}

module.exports.getNews = async (req, res) => {
  console.log(req.body);
  try {
    const result = await newsfeed.Newsfeed.getNews(n=10);
    if(result.length > 0) {
      res.status(200).send(result);
    }
  } catch (err) {
      res.status(500).end();
      console.log(err);
  }
}

// module.exports = {
//   getNews,
//   runAPI
// }
