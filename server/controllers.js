const models = require('../db/models');

const controllers = {
  getPageOfProducts: (req, res) => {
    models.getPageOfProducts(req, (err, results) => (
      err ? res.status(400).send(err) : res.status(200).send(results)
    ));
  },

  getOneProduct: (req, res) => {
    // models.
    res.send('hello from getOneProd');
  },

  getProductStyles: (req, res) => {
    // models.
    res.send('hello from getprodstyles');
  },

  getRelatedProducts: (req, res) => {
    // models.
    res.send('hello from getrelated');
  },

  getCart: (req, res) => {
    // models.
    res.send('hello from getCart');
  },

  addToCart: (req, res) => {
    // models.
    res.send('hello from addtoCart');
  },
};

module.exports = controllers;
