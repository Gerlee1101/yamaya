export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export interface NutritionField {
  label: string;
  value: string;
}

export interface ProductFormData {
  barcode: string;
  name: string;
  nameMn: string;
  manufacturer: string;
  importer: string;
  phone: string;
  weight: string;
  price: string;
  salePercent: string;
  selectedCategories: string[];
  imageUrl: string;
  nutritionFields: NutritionField[];
  nutritionServingSize: string; // e.g., "100г", "1 ширхэг", etc.
  description: string;
  ingredients: string;
  note: string;
  storageInstructions: string;
  storageDuration: string;
  expiryDate: string;
  isMonthlyDeal: boolean;
  isSuperSale: boolean;
}

export interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading: boolean;
}