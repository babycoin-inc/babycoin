const client = require('../../db/index.js')
const axios = require('axios');
const schedule = require('node-schedule');
require("dotenv").config();

let rule = new schedule.RecurrenceRule();
rule.hour = 0.25;

// const job = schedule.scheduleJob(rule, function(){
//   runAPI((err, result)=>{
//     if(err){
//       console.log(err);
//     } else {
//       console.log('Scheduler is working', new Date(Date.now()).toLocaleString());
//     }
//   });
// });

let runAPI = (cb) => {
//let runAPI = () => {
  var options = {
    method:'get',
    params: {
      items:100,
      page:1,
      date: 'last30days',
      token: process.env.CPNAPIKEY
    },
    url:"https://cryptonews-api.com/api/v1/category?section=alltickers"
  }
  axios(options).then((result) => {
    //console.log(Date(result.data.data[0].publish_date));
    for (let i = 0; i < result.data.data.length; i++){
      let art = result.data.data[i];
      //console.log(art.date);
      client.query(
        `INSERT INTO newsfeed ("title", "description", "arthur", "url", "tickers", "publish_date", "image_url", "topics", "type", "sentiment")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [art.title, art.text, art.source_name, art.news_url, art.tickers, art.date , art.image_url, art.topics, art.type, art.sentiment]).then(result =>{
          console.log('result inserted');
        }).catch(err => {
          console.log(err);
        });
    }
    cb(null,result.data.data);
  }).catch(err => {
    cb(err, null);
    console.log(err);
  })
}

let getNews = (coin, n=10) => {
    console.log(coin, n);
    return client.query(`SELECT title, description, arthur, url, tickers, image_url, topics, type, sentiment, publish_date FROM newsfeed WHERE $2 = ANY(tickers) ORDER BY publish_date DESC LIMIT $1`,[n, coin]).then(result => {
      //console.log(result.rows);
      return result.rows;
    }).catch(err => {
      console.log(err);
    });
}
module.exports = {
  getNews,
  runAPI
}