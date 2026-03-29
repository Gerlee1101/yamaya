export interface Product {
  id: string;
  barcode: string;
  name: string;
  nameMn: string;
  manufacturer: string;
  importer: string;
  phone: string;
  weight: string;
  price?: string;
  salePercent?: number;
  note?: string;
  description?: string;
  ingredients?: string;
  allergens?: string;
  storageInstructions?: string;
  storageDuration?: string;
  expiryDate?: string;
  imageUrl?: string;

  // Nutritional information as dynamic array
  nutrition?: Array<{ label: string; value: string }>;
  nutritionServingSize?: string; // e.g., "100г", "1 ширхэг"

  // Legacy nutrition fields (for backward compatibility)
  nutritionCalories?: string;
  nutritionProtein?: string;
  nutritionCarbs?: string;
  nutritionFat?: string;
  nutritionSodium?: string;

  // Stock and availability
  inStock: boolean;
  stockQuantity?: number;

  // Sale flags
  isMonthlyDeal?: boolean;
  isSuperSale?: boolean;

  // Additional metadata
  metadata?: Record<string, unknown>;

  // Timestamps and creator
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;

  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse {
  success: boolean;
  products: Product[];
  pagination: PaginationInfo;
}

export type ViewMode = "grid" | "list";