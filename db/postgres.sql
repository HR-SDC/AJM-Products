-- Database: SDCProducts --------------------------------

-- DROP DATABASE "SDCProducts";

-- CREATE DATABASE "SDCProducts"
--   WITH
--   OWNER = postgres
--   ENCODING = 'UTF8'
--   LC_COLLATE = 'C'
--   LC_CTYPE = 'C'
--   TABLESPACE = pg_default
--   CONNECTION LIMIT = -1;

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


-- Table: products.features---------------------------------------

-- DROP TABLE products.features;

CREATE TABLE products.features
(
    id SERIAL,
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