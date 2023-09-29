-- CREATE TABLE subcategory_produktet (
--     id serial PRIMARY KEY,
--     subcategory_id INT REFERENCES subCategories(id),
--     produktet_id INT REFERENCES produktet(id),
--     UNIQUE (subcategory_id, produktet_id)
-- );

-- CREATE VIEW subcategory_produktet_view AS
-- SELECT
--     subCategories.id AS subcategory_id,
--     subCategories.name AS subcategory_name,
--     produktet.id AS produktet_id,
--     produktet.name AS produktet_name,
--     produktet.price AS produktet_price,
--     produktet.description AS produktet_description,
--     produktet.image_url AS produktet_image_url
-- FROM
--     subcategory_produktet
-- JOIN
--     subCategories ON subcategory_produktet.subcategory_id = subCategories.id
-- JOIN
--     produktet ON subcategory_produktet.produktet_id = produktet.id;
CREATE TABLE subcategory_produktet (
    id serial PRIMARY KEY,
    subcategory_id INT REFERENCES subCategories(id),
    produktet_id INT REFERENCES produktet(id),
    category_id INT REFERENCES categories(id),
    UNIQUE (subcategory_id, produktet_id, category_id)
);


CREATE VIEW subcategory_produktet_view AS
SELECT
    categories.id AS category_id,
    categories.title AS category_title,
    subCategories.id AS subcategory_id,
    subCategories.name AS subcategory_name,
    produktet.id AS produktet_id,
    produktet.name AS produktet_name,
    produktet.price AS produktet_price,
    produktet.description AS produktet_description,
    produktet.image_url AS produktet_image_url
FROM
    subcategory_produktet
JOIN
    subCategories ON subcategory_produktet.subcategory_id = subCategories.id
JOIN
    categories ON subcategory_produktet.category_id = categories.id
JOIN
    produktet ON subcategory_produktet.produktet_id = produktet.id;
