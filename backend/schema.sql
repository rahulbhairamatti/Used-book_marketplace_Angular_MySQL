CREATE DATABASE book_marketplace;
USE book_marketplace;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,  -- Storing plain text! INSECURE!
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    book_condition VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    seller_name VARCHAR(255), -- Added seller_name column
    quantity_in_stock INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL, -- Foreign key to link to the Orders table
    product_id INT NOT NULL, -- Foreign key to link to the Products table
    quantity INT NOT NULL DEFAULT 1, -- Quantity of this product in the order (likely always 1 for unique books, but good to include)
    price_at_purchase DECIMAL(10, 2) NOT NULL, -- Price of the product at the time of purchase (in case product price changes later)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT,
    payment_method VARCHAR(100),
    order_status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 -- Default to TRUE (available) when a book is listed
-- RNING: THIS SQL IS INSECURE! DO NOT USE IN PRODUCTION!
-- FOR TESTING PURPOSES ONLY!
use book_marketplace;
select * from products;
select * from orders;
select * from orderitems;
select * from users;

INSERT INTO Users (username, password, email) VALUES ('testus', 'your', 'testuser@example');
