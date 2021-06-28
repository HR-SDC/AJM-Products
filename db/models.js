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
    const queryStr1 = `SELECT * FROM products.products WHERE id=${product_id};`;
    const queryStr2 = `SELECT features FROM products.featuresarr WHERE prod_id=${product_id};`;
    db.query(queryStr1, (err, data) => {
      if (err) {
        cb(err);
      } else {
        const product = data.rows[0];
        db.query(queryStr2, (err2, data2) => {
          if (err) {
            cb(err2);
          } else {
            product.features = data2.rows[0];
            cb(null, product);
          }
        });
      }
    });
  },

  getProductStyles: (req, cb) => {
    // GET /products/:product_id/styles
    // returns all styles for a given product
    // object with product_id, then results, which contains an array of style objects
    // each style object has styleId, name, origPrice, salePrice, Default, and PhotosArr
    // photosArr is array of objects, each with thumbnail url and url
    // const queryStr1 = `SELECT * FROM products.products WHERE id=${product_id};`;
    // const queryStr2 = (
    //   `SELECT
    //   product_id,
    //   ARRAY_AGG (name ORDER BY product_id) results
    //   FROM products.styles
    //   WHERE product_id = 5
    //   GROUP BY product_id;`
    // );
    // const queryStr2 = (
    //   `SELECT
    //    array_to_json(array_agg(row_to_json(t)))
    //    FROM (
    //    select id as style_id, name, original_price, sale_price, "default" as "default?" from products.styles where product_id=${product_id}
    //    ) t`
    // );
    console.log('hello from product styles');
    const { product_id } = req.params;
    // const queryStr2 = (`
    //   SELECT
    //     array_to_json(array_agg(row_to_json(t)))
    //   FROM (
    //     select id as style_id, name, original_price, sale_price, "default" as "default?",
    //     (
    //       select array_to_json(array_agg(row_to_json(d)))
    //       from (
    //         select thumbnail_url, url
    //         from products.photos
    //         where style_id=products.styles.id
    //       ) d
    //     ) as photos
    //     from products.styles
    //     where product_id=${product_id}
    //   ) t
    // `);
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
