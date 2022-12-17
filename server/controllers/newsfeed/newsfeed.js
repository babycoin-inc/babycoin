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
  console.log('THIS IS WORKING')
  console.log(req.params, req.query);
  try {
    const result = await newsfeed.Newsfeed.getNews(req.params.coin, req.query.n);
    if(result.length > 0) {
      res.status(200).send(result);
    }
  } catch (err) {
      res.status(500).end();
      console.log(err);
  }
}
