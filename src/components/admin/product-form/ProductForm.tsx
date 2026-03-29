"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BasicInfoForm from "./BasicInfoForm";
import PricingForm from "./PricingForm";
import CategorySelection from "./CategorySelection";
import NutritionForm from "./NutritionForm";
import AdditionalDetailsForm from "./AdditionalDetailsForm";
import SaleOptionsForm from "./SaleOptionsForm";
import { ProductFormData, ProductFormProps, Category } from "./types";

const defaultData = {
  barcode: "",
  name: "",
  nameMn: "",
  manufacturer: "",
  importer: "Яамаяа Трейд ХХК",
  phone: "77096060",
  weight: "",
  price: "",
  salePercent: "0",
  selectedCategories: [],
  imageUrl: "",
  nutritionFields: [
    { label: "Илчлэг", value: "" },
    { label: "Уураг", value: "" },
    { label: "Өөх тос", value: "" },
    { label: "Нүүрс ус", value: "" },
    { label: "Давс", value: "" },
  ],
  nutritionServingSize: "100г",
  description: "",
  ingredients: "",
  note: "",
  storageInstructions: "",
  storageDuration: "",
  expiryDate: "Дуусах хугацааг бүтээгдэхүүн дээрээс харна уу",
  isMonthlyDeal: false,
  isSuperSale: false,
};

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    ...defaultData,
    ...initialData,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };

  const handleFieldChange = (
    field: keyof ProductFormData,
    value: string | string[] | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }));
  };

  const handleNutritionFieldChange = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.nutritionFields];
      updated[index][field] = value;
      return {
        ...prev,
        nutritionFields: updated,
      };
    });
  };

  const handleAddNutritionField = () => {
    setFormData((prev) => ({
      ...prev,
      nutritionFields: [...prev.nutritionFields, { label: "", value: "" }],
    }));
  };

  const handleRemoveNutritionField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      nutritionFields: prev.nutritionFields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoForm formData={formData} onFieldChange={handleFieldChange} />

      <PricingForm formData={formData} onFieldChange={handleFieldChange} />

      <SaleOptionsForm formData={formData} onFieldChange={handleFieldChange} />

      <CategorySelection
        categories={categories}
        selectedCategories={formData.selectedCategories}
        onCategoryToggle={handleCategoryToggle}
      />

      <NutritionForm
        nutritionFields={formData.nutritionFields}
        nutritionServingSize={formData.nutritionServingSize}
        onFieldChange={handleNutritionFieldChange}
        onServingSizeChange={(value) =>
          handleFieldChange("nutritionServingSize", value)
        }
        onAddField={handleAddNutritionField}
        onRemoveField={handleRemoveNutritionField}
      />

      <AdditionalDetailsForm
        formData={formData}
        onFieldChange={handleFieldChange}
      />

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="min-w-32"
        >
          {isLoading ? "Хадгалж байна..." : "Хадгалах"}
        </Button>
      </div>
    </form>
  );
}
