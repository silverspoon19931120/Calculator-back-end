-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE excel_form; 

CREATE TABLE IF NOT EXISTS `orders`
(
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `purchase_order` VARCHAR(255) NOT NULL,
  `source_warehouse` VARCHAR(255) NOT NULL,
  `destination_store` VARCHAR(255) NOT NULL,
  `order_date` DATE NOT NULL,
  `product` VARCHAR(255) NOT NULL,
  `product_type` VARCHAR(255) NOT NULL,
  `info` VARCHAR(255) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL
);

