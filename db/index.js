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
  query: (text, params, callback) => pool.query(text, params, callback)
};
