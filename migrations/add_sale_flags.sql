-- Migration: Add sale flags to products table
-- Created: 2025-11-11

-- Add isMonthlyDeal and isSuperSale columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS is_monthly_deal BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_super_sale BOOLEAN DEFAULT FALSE;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_is_monthly_deal ON products(is_monthly_deal) WHERE is_monthly_deal = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_is_super_sale ON products(is_super_sale) WHERE is_super_sale = TRUE;

-- Optional: Add comment to explain the columns
COMMENT ON COLUMN products.is_monthly_deal IS 'Flag indicating if product is featured in monthly deals';
COMMENT ON COLUMN products.is_super_sale IS 'Flag indicating if product is featured in super sale';
