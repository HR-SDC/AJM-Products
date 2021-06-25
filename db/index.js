const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SDCProducts',
  password: 'p0stgr3s',
  port: 5432,
});

pool.connect();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}

// /Users/Andrew.Munoz/HACK_REACTOR_PRECOURSE_2104/HRLAX44/AJM-Products/data/cart.csv


// const { Client, Pool } = require('node-postgres');
// const { Client } = require('pg');

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'SDCProducts',
//   password: 'p0stgr3s',
//   port: 5432,
// })
// client.connect()
// .then(() => console.log('Connected to psql'))
// // .then(() => client.query(`SELECT * FROM public."Cart"`))
// // .then((res) => console.table(res.rows))
// .catch((err) => console.log('err connecting to psql', err));
// // .finally(() => client.end());
// module.exports = client;

