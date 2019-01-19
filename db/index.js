// var pg = require('pg');
// var conString = "postgres://siegel:@localhost:5432/tarque";

// var client = new pg.Client(conString);
// client.connect();


const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'siegel',
  host: 'localhost',
  database: 'tarque',
  password: '',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
// according to: https://node-postgres.com/features/pooling
// this pool method is faster for software
//  that makes frequent queries

const selectOne = pool.query(
  'Select * from rec_products where id=50',
  (err,res) =>{
    console.log('selectOne')
  }
) 



const client = new Client({
  user: 'siegel',
  host: 'localhost',
  database: 'tarque',
  password: '',
  port: 5432,
})
client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log('poop',err, res)
//   client.end()
// })

