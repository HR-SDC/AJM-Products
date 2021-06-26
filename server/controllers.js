const models = require('../db/models');

const controllers = {
  getPageOfProducts: (req, res) => {
    models.getPageOfProducts(req, (err, data) => (
      err ? res.status(400).send(err) : res.status(200).send(data)
    ));
  },

  getOneProduct: (req, res) => {
    models.getOneProduct(req, (err, data) => (
      err ? res.status(400).send(err) : res.status(200).send(data)
    ));
  },

  getProductStyles: (req, res) => {
    models.getProductStyles(req, (err, data) => (
      err ? res.status(400).send(err) : res.status(200).send(data)
    ));
  },

  getRelatedProducts: (req, res) => {
    models.getRelatedProducts(req, (err, data) => (
      err ? res.status(400).send(err) : res.status(200).send(data)
    ));
  },

  getCart: (req, res) => {
    models.getCart(req, (err, data) => (
      err ? res.status(400).send(err) : res.status(200).send(data)
    ));
  },

  addToCart: (req, res) => {
    models.addToCart(req, (err, data) => (
      err ? res.status(400).send(err) : res.status(200).send('Added to cart')
    ));
  },
};

module.exports = controllers;
