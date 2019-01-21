// var pg = require('pg');
// var conString = "postgres://siegel:@localhost:5432/tarque";

// var client = new pg.Client(conString);
// client.connect();

const Promise = require("bluebird");

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'siegel',
  host: 'localhost',
  database: 'tarque',
  password: '',
  port: 5432,
})
const client = new Client({
  user: 'siegel',
  host: 'localhost',
  database: 'tarque',
  password: '',
  port: 5432,
})
client.connect()

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// according to: https://node-postgres.com/features/pooling
// this pool method is faster for software
//  that makes frequent queries

// const selectOne = function(productId) {
//   return pool.query(
//   'Select * from rec_products where id=9000000',
//   (err,res) =>{
//     console.log('db/index received product id: ')
//   }
// ) 
// }

const selectOne = function() {
  return pool.connect()
    .then(client => {
      return client.query('Select * from rec_products where id=9000000')
        .then(res => {
          client.release()
          //console.log('db side: ',res.rows[0])
          return res.rows[0];
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
        })
    })
}

// pool.connect()
//   .then(client => {
//     return client.query('Select * from rec_products where id=9000000', [1])
//       .then(res => {
//         client.release()
//         console.log(res.rows[0])
//       })
//       .catch(e => {
//         client.release()
//         console.log(err.stack)
//       })
//   })

// client.query('SELECT NOW()', (err, res) => {
//   console.log('poop',err, res)
//   client.end()
// })


module.exports = {
  selectOne
}
