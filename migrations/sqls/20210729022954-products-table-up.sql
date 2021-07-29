CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name varchar(60) NOT NULL,
    product_price int NOT NULL,
    product_category varchar(60) NOT NULL
);