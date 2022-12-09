require('../db/index.js'); //tests db connection
const express = require('express');
const app = express();
const port = 4000;
const { home, nf } = require('./controllers/controllers.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//newsfeed
app.get("/newsfeed", (req, res) => {
  console.log('This is working server index 13');
  nf.getNews((err, result) => {
    if(err){
      res.status(500);
    } else {
      res.status(200).send(result);
    }
  })
  // res.status(200).send([{
  //   article: 'Data',
  //   title: 'test'
  // },{
  //   article: 'Data2',
  //   title: 'test2'
  // }]);
});

app.get("/nfAPI", (req, res) => {
  nf.runAPI((err,result) => {
    if(err){
      res.status(500);
    } else {
      res.status(200).send(result);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});