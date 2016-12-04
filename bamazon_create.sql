CREATE database bamazon;

USE bamazon;
CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_qty INTEGER NULL,
  PRIMARY KEY (item_id)
);

USE bamazon;

INSERT INTO products (product_name, department, price, stock_qty)
VALUES ("Ring of Power", "Jewelry", 154.99, 800),
("Elven Cloak", "Clothing", 92.99, 975),
("Magic Wand", "Tools", 211.79, 675),
("Formal Robes", "Clothing", 43.99, 900),
("Silmaril", "Jewelry", 155.99, 925),
("Sonic Screwdriver", "Tools", 88.77, 625),
("Dilithium Crystals", "Tools", 61.75, 600),
("Lightsaber", "Weapons", 201.75, 600),
("Tricorder", "Tools", 67.99, 825),
("Dragon Eggs", "Produce", 119.95, 875),
("Thunderfury", "Weapons", 137.75, 775)