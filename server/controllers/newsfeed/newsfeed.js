require('dotenv').config();
const newsfeed = require('../../../models/newsfeed/newsfeed.js');


let runAPI = (req, res) => {
  newsfeed.runAPI((err,result) => {
    if(err){
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  })
}

let getNews = (n) => async (req, res) => {
  console.log(req.body);
  try {
    const result = await newsfeed.getNews(n=10);
    if(result.length > 0) {
      res.status(200).send(result);
    }
  } catch (err) {
      res.status(500).end();
      console.log(err);
  }
}

module.exports = {
  getNews,
  runAPI
}
