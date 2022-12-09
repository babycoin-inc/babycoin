const client = require('../../../db/index.js')
const axios = require('axios');
require("dotenv").config();

let runAPI = (cb) => {
  var options = {
    method:'get',
    params: {
      items:3,
      page:1,
      token: process.env.CPNAPIKEY
    },
    url:"https://cryptonews-api.com/api/v1/category?section=alltickers"
  }
  axios(options).then((result) => {
    console.log(result.data);
    // result.data.forEach(art => {
    //   client.query(
    //     `INSERT INTO newsfeed ("title", "description", "arthur", "url", "tickers", "publish_date", "image_url", "topics", "type", "sentiment")
    //      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [art.title, art.text, art.source_name, art.news_url, art.tickers, art.publish_date, art.image_url, art.topics, art.type, art.sentiment]);
    // })
    cb(null,result.data);
  }).then(()=>{
  }).catch(err => {
    cb(err, null);
    console.log(err);
  })
}

let getNews = (n = 10, cb) => {
    client.query(`SELECT * FROM newsfeed ORDER BY publish_date DESC LIMIT ${n}`, (err, result) => {
      if(err) {
        cb(err, null)
        console.log(err);
      } else {
        cb(null, result);
      }
    });
}
module.exports = {
  getNews,
  runAPI
}
