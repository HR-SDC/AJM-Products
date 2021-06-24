// const { Client, Pool } = require('node-postgres');
const
// const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'SDCProducts',
  password: 'p0stgr3s',
  port: 5432,
})
client.connect()
.then(() => console.log('Connected to psql'))
// .then(() => client.query(`SELECT * FROM public."Cart"`))
// .then((res) => console.table(res.rows))
.catch((err) => console.log('err connecting to psql', err));
// .finally(() => client.end());
module.exports = client;
