require('dotenv').config();
const express = require('express')
const { pool, connectDb } = require("../db/index.js");

const app = express()
const port = 3000

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Baby Coin App listening on port ${port}`)
});

// Will check database connection
connectDb();

