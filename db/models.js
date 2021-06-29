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
    const { product_id } = req.params;
    // const queryStr1 = `SELECT * FROM products.products WHERE id=${product_id};`;
    // const queryStr2 = `SELECT features FROM products.featuresarr WHERE prod_id=${product_id};`;
    // db.query(queryStr1, (err, data) => {
    //   if (err) {
    //     cb(err);
    //   } else {
    //     const product = data.rows[0];
    //     db.query(queryStr2, (err2, data2) => {
    //       if (err) {
    //         cb(err2);
    //       } else {
    //         product.features = data2.rows[0];
    //         cb(null, product);
    //       }
    //     });
    //   }
    // });
    // const queryStr3 = `
    //   SELECT *, (
    //     SELECT features
    //     FROM products.featuresarr
    //     WHERE prod_id=${product_id}
    //   )
    //   FROM products.products
    //   WHERE id=${product_id};`;
    // db.query(queryStr3, (err, data) => {
    //   if (err) {
    //     cb(err);
    //   } else {
    //     cb(null, data.rows);
    //   }
    // });
    const queryStr4 = `
      SELECT *, (
        SELECT ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(d))) AS features
        FROM (
          SELECT feature, value
          FROM products.features
          WHERE product_id=${product_id}
        ) d )
      FROM products.products
      WHERE id=${product_id};`;
    db.query(queryStr4, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows[0]);
      }
    });
  },

  getProductStyles: (req, cb) => {
    const { product_id } = req.params;
    const queryStr2 = (`
      SELECT JSON_BUILD_OBJECT(
        'product_id', ${product_id},
        'results', json_agg(row_to_json(t))
      ) AS stylesObj
      FROM (
        SELECT id AS style_id, name, original_price, sale_price, "default" AS "default?",
          (
            SELECT ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(d)))
            FROM (
              SELECT thumbnail_url, url
              FROM products.photos
              WHERE style_id=products.styles.id
            ) d
        ) AS photos,
        (
          SELECT JSON_OBJECT_AGG(
            products.skus.id,
            JSON_BUILD_OBJECT(
              'size', products.skus.size,
              'quantity', products.skus.quantity
          ))
        FROM products.skus
        WHERE style_id=products.styles.id
      ) AS skus
      FROM products.styles
      WHERE product_id=${product_id}
      ) t`);
    db.query(queryStr2, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows[0].stylesobj);
      }
    });
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
    // returns array of objects, each obj has sku_id, and count\
    // need to get user session Id in order to know what cart to get
  },

  addToCart: (req, cb) => {
    // POST /cart
    // Body parameter sku_id - ID for product being added to cart
    // need to get user session Id somehow, and if they're active
  },
};

module.exports = models;
