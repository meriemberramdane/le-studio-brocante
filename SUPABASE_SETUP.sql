-- ============================================
-- Le Studio Brocante - Supabase Setup Script
-- ============================================
-- Run these SQL commands in Supabase SQL Editor
-- to create all necessary tables and setup

-- 1. Products Table
-- Stores all product information
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  condition VARCHAR(50) NOT NULL,
  dimensions VARCHAR(255),
  stock_status VARCHAR(20) NOT NULL DEFAULT 'available',
  images TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
-- Stores customer orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_stock_status ON products(stock_status);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_email ON orders(email);

-- 4. Create storage bucket policies
-- First, the storage bucket is created in the UI
-- Then apply these policies in SQL:

CREATE POLICY "Public access to product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated upload to product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated update to product images"
  ON storage.objects FOR UPDATE
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated delete from product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images');

-- ============================================
-- Sample Data (Optional - Remove for production)
-- ============================================
-- Uncomment and run to add sample products

/*
INSERT INTO products (
  name, price, description, category, condition, 
  dimensions, stock_status, images
) VALUES (
  'Miroir Vénitien Vintage',
  450.00,
  'Un magnifique miroir vénitien du 18ème siècle avec un cadre doré et ornementé. Parfait pour ajouter une touche d''élégance à votre intérieur.',
  'mirrors',
  'excellent',
  '80cm x 60cm',
  'available',
  ARRAY['https://your-supabase-url.com/storage/v1/object/public/product-images/mirror1.jpg']
);

INSERT INTO products (
  name, price, description, category, condition,
  dimensions, stock_status, images
) VALUES (
  'Fauteuil Club Louis XV',
  1200.00,
  'Fauteuil club authentique du 18ème siècle, restauré avec soin. Tissu de haute qualité, structure en bois massif.',
  'furniture',
  'very-good',
  '80cm x 75cm x 85cm',
  'available',
  ARRAY['https://your-supabase-url.com/storage/v1/object/public/product-images/chair1.jpg']
);
*/

-- ============================================
-- Useful Queries
-- ============================================

-- View all products
-- SELECT * FROM products ORDER BY created_at DESC;

-- View available products only
-- SELECT * FROM products WHERE stock_status = 'available' ORDER BY created_at DESC;

-- View all orders
-- SELECT * FROM orders ORDER BY created_at DESC;

-- Count products by category
-- SELECT category, COUNT(*) FROM products GROUP BY category;

-- Delete all products (use carefully!)
-- DELETE FROM products;

-- ============================================
-- End of Setup
-- ============================================
