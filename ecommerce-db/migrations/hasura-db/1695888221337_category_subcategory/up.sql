-- Create the junction table
CREATE TABLE category_subcategory (
    id serial PRIMARY KEY,
    category_id INT REFERENCES categories(id),
    subcategory_id INT REFERENCES subCategories(id),
    UNIQUE (category_id, subcategory_id)
);

CREATE VIEW subcategory_categories_view AS
SELECT
    subCategories.id AS subcategory_id,
    subCategories.name AS subcategory_name,
    subCategories.image_url AS subcategory_image_url,
    categories.id AS category_id,
    categories.title AS category_title
FROM
    category_subcategory
JOIN
    subCategories ON category_subcategory.subcategory_id = subCategories.id
JOIN
    categories ON category_subcategory.category_id = categories.id;