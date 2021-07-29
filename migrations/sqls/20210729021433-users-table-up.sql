CREATE table users (
    id SERIAL PRIMARY KEY,
    firstname varchar(30) NOT NULL,
    lastname varchar(30) NOT NULL,
    user_password varchar(60) NOT NULL
);