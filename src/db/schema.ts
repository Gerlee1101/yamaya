import { pgTable, text, timestamp, decimal, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  phone: text("phone").notNull().unique(), // Phone number for login
  password: text("password").notNull(),
  role: text("role").notNull(), // 'admin' or 'manager'
  name: text("name").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"), // emoji or icon identifier
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  barcode: text("barcode").notNull().unique(),
  name: text("name").notNull(),
  nameMn: text("name_mn").notNull(),
  manufacturer: text("manufacturer").notNull(),
  importer: text("importer").notNull(),
  phone: text("phone").notNull(),
  weight: text("weight").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  salePercent: integer("sale_percent").default(0), // Sale discount percentage
  note: text("note"), // Special notes (санамж)
  description: text("description"),
  ingredients: text("ingredients"),
  allergens: text("allergens"),
  storageInstructions: text("storage_instructions"),
  storageDuration: text("storage_duration"), // Storage duration (Хадгалах хугацаа)
  expiryDate: text("expiry_date"),
  imageUrl: text("image_url"),

  // Nutritional information - stored as JSON array for dynamic fields
  // Format: [{ label: "Уураг", value: "10g" }, { label: "Өөх тос", value: "5g" }]
  nutrition: jsonb("nutrition").$type<Array<{ label: string; value: string }>>(),
  nutritionServingSize: text("nutrition_serving_size"), // e.g., "100г", "1 ширхэг"

  // Legacy nutrition fields (kept for backward compatibility)
  nutritionCalories: text("nutrition_calories"),
  nutritionProtein: text("nutrition_protein"),
  nutritionCarbs: text("nutrition_carbs"),
  nutritionFat: text("nutrition_fat"),
  nutritionSodium: text("nutrition_sodium"),

  // Stock and availability
  inStock: boolean("in_stock").default(true),
  stockQuantity: integer("stock_quantity").default(0),

  // Sale flags
  isMonthlyDeal: boolean("is_monthly_deal").default(false),
  isSuperSale: boolean("is_super_sale").default(false),

  // Additional metadata
  metadata: jsonb("metadata"), // For flexible additional data

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: text("created_by").references(() => users.id),
});

// Junction table for many-to-many relationship between products and categories
export const productsToCategories = pgTable("products_to_categories", {
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  categoryId: text("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  productsToCategories: many(productsToCategories),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  productsToCategories: many(productsToCategories),
  creator: one(users, {
    fields: [products.createdBy],
    references: [users.id],
  }),
}));

export const productsToCategoriesRelations = relations(productsToCategories, ({ one }) => ({
  product: one(products, {
    fields: [productsToCategories.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [productsToCategories.categoryId],
    references: [categories.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
}));
