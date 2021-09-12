const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SDCProducts2',
  password: 'p0stgr3s',
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = pool;
