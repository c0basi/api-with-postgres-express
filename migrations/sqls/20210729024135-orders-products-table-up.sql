 CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    quantity int NOT NULL,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id)
);