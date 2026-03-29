ALTER TABLE "products" ADD COLUMN "nutrition_serving_size" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_monthly_deal" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_super_sale" boolean DEFAULT false;