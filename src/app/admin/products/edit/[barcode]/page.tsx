"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "../../../../../components/AdminLayout";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { ProductForm, ProductFormData } from "@/components/admin/product-form";

interface Product {
  id: string;
  barcode: string;
  name: string;
  nameMn: string;
  manufacturer: string;
  importer: string;
  phone: string | null;
  weight: string | null;
  price: string | null;
  salePercent: number;
  description: string | null;
  ingredients: string | null;
  note: string | null;
  storageInstructions: string | null;
  storageDuration: string | null;
  expiryDate: string | null;
  imageUrl: string | null;
  nutrition: Array<{ label: string; value: string }> | null;
  nutritionServingSize?: string | null;
  isMonthlyDeal?: boolean;
  isSuperSale?: boolean;
  categories: Array<{ id: string; name: string; icon?: string }>;
}

function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const barcode = params.barcode as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState("");

  // Fetch product data
  useEffect(() => {
    if (!barcode) return;

    const fetchProduct = async () => {
      try {
        setIsLoadingProduct(true);
        const response = await fetch(`/api/products/${barcode}`, {
          headers: {
            Authorization: JSON.stringify(user),
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setProduct(data.product);
        } else {
          setError(data.error || "Бүтээгдэхүүн олдсонгүй");
        }
      } catch (error) {
        console.error("Fetch product error:", error);
        setError("Бүтээгдэхүүн авахад алдаа гарлаа");
      } finally {
        setIsLoadingProduct(false);
      }
    };

    if (user) {
      fetchProduct();
    }
  }, [barcode, user]);

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

      const response = await fetch(`/api/products/${barcode}`, {
        method: "PUT",
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
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Бүтээгдэхүүн амжилттай шинэчлэгдлээ!");
        router.push("/admin/products");
      } else {
        setError(data.error || "Бүтээгдэхүүн шинэчлэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Update product error:", error);
      setError("Бүтээгдэхүүн шинэчлэхэд алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Бүтээгдэхүүний мэдээлэл ачаалж байна...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error && !product) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Алдаа</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/admin/products")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Бүтээгдэхүүний жагсаалт руу буцах
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!product) {
    return null;
  }

  // Convert product data to form data format
  const initialFormData: Partial<ProductFormData> = {
    barcode: product.barcode,
    name: product.name,
    nameMn: product.nameMn,
    manufacturer: product.manufacturer,
    importer: product.importer,
    phone: product.phone || "",
    weight: product.weight || "",
    price: product.price || "",
    salePercent: product.salePercent?.toString() || "0",
    selectedCategories: product.categories.map((cat) => cat.id),
    imageUrl: product.imageUrl || "",
    nutritionFields:
      product.nutrition && product.nutrition.length > 0
        ? product.nutrition
        : [
            { label: "Илчлэг", value: "" },
            { label: "Уураг", value: "" },
            { label: "Өөх тос", value: "" },
            { label: "Нүүрс ус", value: "" },
            { label: "Давс", value: "" },
          ],
    nutritionServingSize: product.nutritionServingSize || "100г",
    description: product.description || "",
    ingredients: product.ingredients || "",
    note: product.note || "",
    storageInstructions: product.storageInstructions || "",
    storageDuration: product.storageDuration || "",
    expiryDate:
      product.expiryDate || "Дуусах хугацааг бүтээгдэхүүн дээрээс харна уу",
    isMonthlyDeal: product.isMonthlyDeal || false,
    isSuperSale: product.isSuperSale || false,
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Бүтээгдэхүүн засах
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 font-medium">
                {product.name} - {product.barcode}
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/products")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              Буцах
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <ProductForm
          initialData={initialFormData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
}

export default function EditProductPage() {
  return (
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  );
}
