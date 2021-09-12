/* eslint-disable camelcase */
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

    const queryStr = `
      SELECT *
      FROM products.products
      WHERE id>=${productId}
      ORDER BY id ASC
      LIMIT ${count};
    `;

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

    const queryStr4 = `
      SELECT *,
      (
        SELECT ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(d))) AS features
        FROM (
          SELECT feature, value
          FROM products.features
          WHERE product_id=${product_id}
        ) d )
      FROM products.products
      WHERE id=${product_id};
    `;

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

    const queryStr = `
      SELECT ARRAY(SELECT DISTINCT UNNEST(related) ORDER BY 1) AS related
      FROM products.relatedarr
      WHERE id=${product_id};
    `;

    db.query(queryStr, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows[0].related);
      }
    });
  },

};

module.exports = models;
