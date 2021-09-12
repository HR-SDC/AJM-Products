-- Database: SDCProducts --------------------------------

DROP DATABASE IF EXISTS "SDCProductsEC2";

CREATE DATABASE "SDCProducts"
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;

-- SCHEMA: products -----------------------------------------

DROP SCHEMA products;

CREATE SCHEMA products
    AUTHORIZATION postgres;

-- Table: products.products --------------------------------

-- DROP TABLE products.products;

CREATE TABLE products.products
(
    id SERIAL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    slogan character varying(300) COLLATE pg_catalog."default" NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    category character varying(35) COLLATE pg_catalog."default" NOT NULL,
    default_price integer NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE products.products
    OWNER to postgres;

-- DROP INDEX products.index_prod_id;

CREATE INDEX index_prod_id
    ON products.products USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.styles----------------------------------------

-- DROP TABLE products.styles;

CREATE TABLE products.styles
(
    id SERIAL,
    product_id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    sale_price integer,
    original_price integer NOT NULL,
    "default" boolean NOT NULL,
    CONSTRAINT styles_pkey PRIMARY KEY (id),
    CONSTRAINT prod_fk FOREIGN KEY (product_id)
        REFERENCES products.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE products.styles
    OWNER to postgres;

-- DROP INDEX products.index_styles_id;

CREATE INDEX index_styles_id
    ON products.styles USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

-- DROP INDEX products.index_styles_product_id;

CREATE INDEX index_styles_product_id
    ON products.styles USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.photos-----------------------------------------

-- DROP TABLE products.photos;

CREATE TABLE products.photos
(
    id SERIAL,
    style_id integer NOT NULL,
    url character varying(250) COLLATE pg_catalog."default" NOT NULL,
    thumbnail_url character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT style_fk FOREIGN KEY (style_id)
        REFERENCES products.styles (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE products.photos
    OWNER to postgres;

-- DROP INDEX products.index_style_id;

CREATE INDEX index_style_id
    ON products.photos USING btree
    (style_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.skus------------------------------------------

-- DROP TABLE products.skus;

CREATE TABLE products.skus
(
    id SERIAL,
    style_id integer NOT NULL,
    size character varying(10) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT skus_pkey PRIMARY KEY (id),
    CONSTRAINT style_fk FOREIGN KEY (style_id)
        REFERENCES products.styles (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE products.skus
    OWNER to postgres;

-- DROP INDEX products.index_skus_id;

CREATE INDEX index_skus_id
    ON products.skus USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

-- DROP INDEX products.index_skus_style_id;

CREATE INDEX index_skus_style_id
    ON products.skus USING btree
    (style_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.cart-------------------------------------------

-- DROP TABLE products.cart;

CREATE TABLE products.cart
(
    id SERIAL,
    user_session_id integer NOT NULL,
    product_id integer NOT NULL,
    active boolean NOT NULL,
    CONSTRAINT cart_pkey PRIMARY KEY (id),
    CONSTRAINT prod_fk FOREIGN KEY (product_id)
        REFERENCES products.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE products.cart
    OWNER to postgres;

-- DROP INDEX products.index_cart_user_session_id;

CREATE INDEX index_cart_user_session_id
    ON products.cart USING btree
    (user_session_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.related-----------------------------------------

-- DROP TABLE products.related;

CREATE TABLE products.related
(
    id SERIAL,
    current_product_id integer NOT NULL,
    related_product_id integer,
    CONSTRAINT related_pkey PRIMARY KEY (id),
    CONSTRAINT current_fk FOREIGN KEY (current_product_id)
        REFERENCES products.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT related_fk FOREIGN KEY (related_product_id)
        REFERENCES products.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE products.related
    OWNER to postgres;

-- DROP INDEX products.index_related_current_id;

CREATE INDEX index_related_current_id
    ON products.related USING btree
    (current_product_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.relatedarr-------------------------------------

-- DROP TABLE products.relatedarr;

CREATE TABLE products.relatedarr
(
    id SERIAL,
    related integer[] NOT NULL,
    CONSTRAINT relatedarr_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE products.relatedarr
    OWNER to postgres;

-- DROP INDEX products.index_relatedarr_id;

CREATE INDEX index_relatedarr_id
    ON products.relatedarr USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.features---------------------------------------

-- DROP TABLE products.features;

CREATE TABLE products.features
(
    id SERIAL,
    product_id integer NOT NULL,
    feature character varying(50) COLLATE pg_catalog."default" NOT NULL,
    value character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT features_pkey PRIMARY KEY (id),
    CONSTRAINT prod_fk FOREIGN KEY (product_id)
        REFERENCES products.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE products.features
    OWNER to postgres;

-- DROP INDEX products.index_features_product_id;

CREATE INDEX index_features_product_id
    ON products.features USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: products.featuresarr---------------------------------------

-- DROP TABLE products.featuresarr;

CREATE TABLE products.featuresarr
(
    id SERIAL,
    features character varying(50)[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT featuresarr_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE products.featuresarr
    OWNER to postgres;

-- DROP INDEX products.index_featuresarr_id;

CREATE INDEX index_featuresarr_id
    ON products.featuresarr USING btree
    (prod_id ASC NULLS LAST)
    TABLESPACE pg_default;