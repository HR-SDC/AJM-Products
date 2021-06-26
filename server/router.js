const router = require('express').Router();
const controllers = require('./controllers');

router
  .get('/products', controllers.getPageOfProducts)
  .get('/products/:product_id', controllers.getOneProduct)
  .get('/products/:product_id/styles', controllers.getProductStyles)
  .get('/products/:product_id/related', controllers.getRelatedProducts)
  .get('/cart', controllers.getCart)
  .post('/cart', controllers.addToCart);

module.exports = router;
