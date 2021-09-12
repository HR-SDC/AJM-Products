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

// pool.connect((err) => {
//   if (err) {
//     console.log('err connecting to db', err.stack);
//   } else {
//     console.log('connected to psql db');
//   }
// });

// module.exports = {
//   query: (text, params, callback) => pool.query(text, params, callback),
// };
