const client = require('./index.js');

const copy = () => {
  client.query(`COPY public."Cart" FROM './data/cart.csv' DELIMITER ',' CSV HEADER`)
  .then((res) => console.log('res', res.rows[0]))
  .catch((err) => console.log('err', err));
}

copy();