/*-- products table (provided by user)
 CREATE TABLE IF NOT EXISTS products (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 description TEXT,
 price DECIMAL(10, 2) NOT NULL,
 category VARCHAR(100),
 stock_quantity INTEGER DEFAULT 0,
 image_url VARCHAR(500),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );-- inquiries table (provided by user)
 CREATE TABLE IF NOT EXISTS inquiries (

id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 subject VARCHAR(255),
 message TEXT NOT NULL,
 status VARCHAR(50) DEFAULT 'pending',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );-- users table (company users & admins)
 CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 role VARCHAR(50) DEFAULT 'user',-- 'user' or 'admin'
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );-- Simple trigger to update updated_at on update for common tables
 CREATE OR REPLACE FUNCTION update_updated_at_column()
 RETURNS TRIGGER AS
 $$
 BEGIN
 NEW.updated_at = NOW();
 RETURN NEW;
 END;
 $$ language 'plpgsql';
 CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
 FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
 CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON inquiries
 FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
 CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
 FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();*/
 -- products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- users table (company users & admins)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to update updated_at on update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop triggers if they exist to avoid duplicate errors
DROP TRIGGER IF EXISTS products_updated_at ON products;
DROP TRIGGER IF EXISTS inquiries_updated_at ON inquiries;
DROP TRIGGER IF EXISTS users_updated_at ON users;

-- Recreate triggers
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER inquiries_updated_at
BEFORE UPDATE ON inquiries
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
