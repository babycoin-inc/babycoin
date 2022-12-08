const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

// const client = new Client({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT
// })
const client = new Client({
  user: 'localhost',
  host: 'localhost',
  database: '1234',
  password: 'root',
  port: 'postgres'
})

client.connect().then(() => {
  console.log('Connected to postgres')
}).catch(err => {
  console.log(err);
})

let runAPI = () => {

}

let getAll = (cb) => {
    client.query('SELECT * FROM newsfeed', (err, result) {
      if(err) {
        console.log(err);
      } else {
        cb(result);
      }
    });
}
module.exports = {
  getAll
  runAPI

}
