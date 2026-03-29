"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../../components/AdminLayout";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { ProductForm, ProductFormData } from "@/components/admin/product-form";

function CreateProduct() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: ProductFormData) => {
    setError("");
    setIsLoading(true);

    // Validation
    if (
      !formData.barcode ||
      !formData.name ||
      !formData.nameMn ||
      !formData.manufacturer
    ) {
      setError("Баркод, нэр, үйлдвэрлэгч заавал бөглөнө үү");
      setIsLoading(false);
      return;
    }

    if (formData.selectedCategories.length === 0) {
      setError("Наад зах нь нэг ангилал сонгоно уу");
      setIsLoading(false);
      return;
    }

    try {
      // Filter out empty nutrition fields
      const validNutrition = formData.nutritionFields.filter(
        (field) => field.label.trim() && field.value.trim()
      );

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(user),
        },
        body: JSON.stringify({
          barcode: formData.barcode,
          name: formData.name,
          nameMn: formData.nameMn,
          manufacturer: formData.manufacturer,
          importer: formData.importer,
          phone: formData.phone,
          weight: formData.weight,
          price: formData.price || null,
          salePercent: parseInt(formData.salePercent) || 0,
          categoryIds: formData.selectedCategories,
          imageUrl: formData.imageUrl || null,
          nutrition: validNutrition.length > 0 ? validNutrition : null,
          nutritionServingSize: formData.nutritionServingSize || null,
          description: formData.description || null,
          ingredients: formData.ingredients || null,
          note: formData.note || null,
          storageInstructions: formData.storageInstructions || null,
          storageDuration: formData.storageDuration || null,
          expiryDate: formData.expiryDate || null,
          isMonthlyDeal: formData.isMonthlyDeal || false,
          isSuperSale: formData.isSuperSale || false,
          inStock: true,
          stockQuantity: 0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Бүтээгдэхүүн амжилттай нэмэгдлээ!");
        router.push("/admin/products");
      } else {
        setError(data.error || "Бүтээгдэхүүн нэмэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Create product error:", error);
      setError("Бүтээгдэхүүн нэмэхэд алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Шинэ бүтээгдэхүүн нэмэх
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 font-medium">
            Бүтээгдэхүүний мэдээллийг оруулна уу
          </p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <CreateProduct />
    </ProtectedRoute>
  );
}
