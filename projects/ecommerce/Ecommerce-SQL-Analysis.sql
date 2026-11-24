-- E-COMMERCE SALES ANALYSIS | MYSQL 8+
-- Portfolio case study. Reporting period: 2025.
-- Import orders.csv, products.csv and customers.csv into the corresponding tables.
-- All amounts are USD. Recognized revenue and profit use Completed orders only.

CREATE DATABASE IF NOT EXISTS ecommerce_analysis;
USE ecommerce_analysis;

CREATE TABLE IF NOT EXISTS customers (
  customer_id VARCHAR(10) PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  region VARCHAR(30),
  segment VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS products (
  product_id VARCHAR(10) PRIMARY KEY,
  product_name VARCHAR(120) NOT NULL,
  category VARCHAR(60),
  list_price_usd DECIMAL(12,2),
  standard_unit_cost_usd DECIMAL(12,2)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id VARCHAR(12) PRIMARY KEY,
  order_date DATE NOT NULL,
  customer_id VARCHAR(10),
  product_id VARCHAR(10),
  quantity INT,
  unit_price_usd DECIMAL(12,2),
  discount_rate DECIMAL(6,4),
  unit_cost_usd DECIMAL(12,2),
  region VARCHAR(30),
  order_status VARCHAR(30),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Import order: customers -> products -> orders.
-- MySQL Workbench: right-click each table > Table Data Import Wizard,
-- then select the CSV with the matching name. Enable 'first row is headers'.

-- 01 DATA QUALITY AUDIT
SELECT COUNT(*) AS total_orders, COUNT(DISTINCT order_id) AS distinct_order_ids,
 COUNT(*)-COUNT(DISTINCT order_id) AS duplicate_order_ids,
 SUM(customer_id IS NULL OR customer_id='') AS missing_customer_ids,
 SUM(product_id IS NULL OR product_id='') AS missing_product_ids,
 SUM(quantity<=0) AS invalid_quantities,
 SUM(discount_rate<0 OR discount_rate>1) AS invalid_discounts
FROM orders;

SELECT o.order_status, COUNT(*) AS order_count
FROM orders o GROUP BY o.order_status ORDER BY order_count DESC;

-- 02 REUSABLE VIEW
CREATE OR REPLACE VIEW sales_analysis AS
SELECT o.order_id, o.order_date, o.customer_id, c.customer_name,
 c.segment, o.product_id, p.product_name, p.category, o.region,
 o.order_status, o.quantity, o.unit_price_usd, o.discount_rate, o.unit_cost_usd,
 (o.quantity * o.unit_price_usd) AS gross_sales_usd,
 (o.quantity * o.unit_price_usd * (1-o.discount_rate)) AS net_revenue_usd,
 (o.quantity * o.unit_cost_usd) AS cogs_usd,
 (o.quantity * (o.unit_price_usd * (1-o.discount_rate) - o.unit_cost_usd)) AS gross_profit_usd
FROM orders o
JOIN customers c ON o.customer_id=c.customer_id
JOIN products p ON o.product_id=p.product_id;

-- 03 EXECUTIVE KPIS
SELECT COUNT(*) AS completed_orders,
 ROUND(SUM(gross_sales_usd),2) AS gross_sales_usd,
 ROUND(SUM(net_revenue_usd),2) AS net_revenue_usd,
 ROUND(SUM(cogs_usd),2) AS cogs_usd,
 ROUND(SUM(gross_profit_usd),2) AS gross_profit_usd,
 ROUND(100*SUM(gross_profit_usd)/NULLIF(SUM(net_revenue_usd),0),2) AS gross_margin_pct
FROM sales_analysis WHERE order_status='Completed';

-- 04 MONTHLY TREND
SELECT DATE_FORMAT(order_date,'%Y-%m') AS sales_month,
 COUNT(*) AS completed_orders,
 ROUND(SUM(net_revenue_usd),2) AS net_revenue_usd,
 ROUND(SUM(gross_profit_usd),2) AS gross_profit_usd
FROM sales_analysis WHERE order_status='Completed'
GROUP BY DATE_FORMAT(order_date,'%Y-%m') ORDER BY sales_month;

-- 05 CATEGORY PERFORMANCE
SELECT category, COUNT(*) AS completed_orders,
 ROUND(SUM(net_revenue_usd),2) AS revenue_usd,
 ROUND(SUM(gross_profit_usd),2) AS profit_usd,
 ROUND(100*SUM(gross_profit_usd)/NULLIF(SUM(net_revenue_usd),0),2) AS margin_pct
FROM sales_analysis WHERE order_status='Completed'
GROUP BY category ORDER BY revenue_usd DESC;

-- 06 REGION PERFORMANCE
SELECT region, COUNT(*) AS completed_orders,
 ROUND(SUM(net_revenue_usd),2) AS revenue_usd,
 ROUND(SUM(gross_profit_usd),2) AS profit_usd
FROM sales_analysis WHERE order_status='Completed'
GROUP BY region ORDER BY revenue_usd DESC;

-- 07 TOP PRODUCTS
SELECT product_name,category,
 ROUND(SUM(net_revenue_usd),2) AS revenue_usd,
 ROUND(SUM(gross_profit_usd),2) AS profit_usd
FROM sales_analysis WHERE order_status='Completed'
GROUP BY product_id,product_name,category ORDER BY revenue_usd DESC LIMIT 10;

-- 08 PRODUCTS WITH LOWEST GROSS MARGIN
SELECT product_name,category,
 ROUND(SUM(net_revenue_usd),2) AS revenue_usd,
 ROUND(100*SUM(gross_profit_usd)/NULLIF(SUM(net_revenue_usd),0),2) AS margin_pct
FROM sales_analysis WHERE order_status='Completed'
GROUP BY product_id,product_name,category
ORDER BY margin_pct ASC LIMIT 10;

-- 09 CUSTOMER REVENUE
SELECT customer_id,customer_name,segment,
 ROUND(SUM(net_revenue_usd),2) AS revenue_usd
FROM sales_analysis WHERE order_status='Completed'
GROUP BY customer_id,customer_name,segment ORDER BY revenue_usd DESC LIMIT 10;
