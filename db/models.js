// const path = require('path');
const db = require('./index');

const models = {
  getPageOfProducts: (req, cb) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    let productId;
    if (page > 1) {
      productId = page * 1000;
    } else {
      productId = 1;
    }
    const queryStr = `SELECT * FROM products.products WHERE id>=${productId} ORDER BY id ASC LIMIT ${count};`;
    db.query(queryStr, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },

  getOneProduct: (req, cb) => {
    // GET /products/:product_id
    // product ID parameter
    // returns object with id, name, slogan, description, category, default_price, features array
  },

  getProductStyles: (req, cb) => {
    // GET /products/:product_id/styles
    // returns all styles for a given product
    // object with product_id, then results, which contains an array of style objects
    // each style object has styleId, name, origPrice, salePrice, Default, and PhotosArr
    // photosArr is array of objects, each with thumbnail url and url
  },

  getRelatedProducts: (req, cb) => {
    const { product_id } = req.params;
    const queryStr = `SELECT related FROM products.relatedarr WHERE id=${product_id};`;
    db.query(queryStr, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows[0].related);
      }
    });
  },

  getCart: (req, cb) => {
    // GET /cart
    // returns array of objects, each obj has sku_id, and count
  },

  addToCart: (req, cb) => {
    // POST /cart
    // Body parameter sku_id - ID for product being added to cart
    // need to get user session Id somehow, and if they're active
  },
};

module.exports = models;
