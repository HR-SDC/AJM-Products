const client = require('./index.js');
let table = "Cart";
const copy = () => {
  client.query(`COPY public."Cart" FROM '/Users/Andrew.Munoz/HACK_REACTOR_PRECOURSE_2104/HRLAX44/AJM-Products/data/cart.csv' DELIMITER ',' CSV HEADER`)
  .then((res) => console.log('res', res.rows[0]))
  .catch((err) => console.log('err', err));
}

copy();