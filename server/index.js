const express = require('express')
const app = express()
const port = 3000
const nfserver = require('./newsfeed/database.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//newsfeed
app.get("/newsfeed", (req, res) => {
  nfserver.getAll(console.log);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});