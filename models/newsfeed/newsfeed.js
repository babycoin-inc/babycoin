const client = require('../../db/index.js')
const axios = require('axios');
const cron = require('node-schedule');
require("dotenv").config();

var rule = new cron.RecurrenceRule();
rule.hour = 0;
rule.minute = 1;
cron.scheduleJob(rule, function(){
    console.log(new Date(), 'Every 1 hours');
});
// const job = schedule.scheduleJob(rule, function(){
//   runAPI((err, result)=>{
//     if(err){
//       console.log(err);
//     } else {
//       console.log('Scheduler is working', new Date(Date.now()).toLocaleString());
//     }
//   });
// });
const runAPI = () => {
  var options = {
    method:'get',
    params: {
      items:100,
      page:1,
      date: '12152022-12182022',
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
  }).catch(err => {
    console.log(err);
  })
}

const getNews = (coin, n=10) => {
    //console.log('line 48',coin, n);
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