CREATE TABLE categories (
    id serial PRIMARY KEY,
    title text NOT NULL
);


CREATE TABLE subCategories (
    id serial PRIMARY KEY;
    name text NOT NULL;
);