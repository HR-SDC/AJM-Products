-- Database: SDCProducts --------------------------------

DROP DATABASE IF EXISTS "SDCProducts";

CREATE DATABASE "SDCProducts"
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;

-- SCHEMA: products -----------------------------------------

DROP SCHEMA IF EXISTS products;

CREATE SCHEMA products
    AUTHORIZATION postgres;

-- Table: products.products --------------------------------

DROP TABLE IF EXISTS products.products;

CREATE TABLE products.products
(
    id integer NOT NULL DEFAULT nextval('products.products_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    slogan character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    category character varying(35) COLLATE pg_catalog."default" NOT NULL,
    default_price integer NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE products.products
    OWNER to postgres;

-- Table: products.styles----------------------------------------

DROP TABLE IF EXISTS products.styles;

CREATE TABLE products.styles
(
    id integer NOT NULL DEFAULT nextval('products.styles_id_seq'::regclass),
    product_id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    sale_price integer NOT NULL,
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

-- Table: products.photos-----------------------------------------

DROP TABLE IF EXISTS products.photos;

CREATE TABLE products.photos
(
    id integer NOT NULL DEFAULT nextval('products.photos_id_seq'::regclass),
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

-- Table: products.skus------------------------------------------

DROP TABLE IF EXISTS products.skus;

CREATE TABLE products.skus
(
    id integer NOT NULL DEFAULT nextval('products.skus_id_seq'::regclass),
    style_id integer NOT NULL,
    size character varying(5) COLLATE pg_catalog."default" NOT NULL,
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

-- Table: products.cart-------------------------------------------

DROP TABLE IF EXISTS products.cart;

CREATE TABLE products.cart
(
    id integer NOT NULL DEFAULT nextval('products.cart_id_seq'::regclass),
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

-- Table: products.related-----------------------------------------

DROP TABLE IF EXISTS products.related;

CREATE TABLE products.related
(
    id integer NOT NULL DEFAULT nextval('products.related_id_seq'::regclass),
    current_product_id integer NOT NULL,
    related_product_id integer NOT NULL,
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

-- Table: products.features---------------------------------------

DROP TABLE IF EXISTS products.features;

CREATE TABLE products.features
(
    id integer NOT NULL DEFAULT nextval('products.features_id_seq'::regclass),
    product_id integer NOT NULL,
    feature character varying(50) COLLATE pg_catalog."default" NOT NULL,
    value character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT features_pkey PRIMARY KEY (id),
    CONSTRAINT prod_fk FOREIGN KEY (product_id)
        REFERENCES products.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE products.features
    OWNER to postgres;