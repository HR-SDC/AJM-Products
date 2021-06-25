/* eslint-disable no-console */
const path = require('path');
const client = require('./index');

const seedCSV = (table) => {
  const source = path.join(__dirname, `../data/${table}.csv`);

  client.query(
    `COPY products.${table}
    FROM '${source}'
    NULL 'null'
    DELIMITER ','
    CSV HEADER`,
  )
    .then(() => console.log('seeded successfully'))
    .catch((err) => console.log('err', err));
};

const seedCSVRelated = (table) => {
  const source = path.join(__dirname, `../data/${table}.csv`);

  client.query(
    `COPY products.${table}
    FROM '${source}'
    NULL '0'
    DELIMITER ','
    CSV HEADER`,
  )
    .then(() => console.log('seeded successfully'))
    .catch((err) => console.log('err', err));
};

seedCSV('products');
seedCSV('styles');
seedCSV('skus');
seedCSV('relatedarr');
seedCSVRelated('related');
seedCSV('photos');
seedCSV('cart');
seedCSV('features');
seedCSV('featuresarr');
