CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    order_status varchar(20) NOT NULL,
    user_id INT REFERENCES users(id)
);