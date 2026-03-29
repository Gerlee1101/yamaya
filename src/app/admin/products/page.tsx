"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminLayout from "../../../components/AdminLayout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

interface Product {
  id: string;
  barcode: string;
  name: string;
  nameMn: string;
  manufacturer: string;
  importer: string;
  phone: string;
  weight: string;
  price: string | null;
  imageUrl: string | null;
  inStock: boolean;
  stockQuantity: number;
  categories: Category[];
  createdAt: string;
}

function ProductsList() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (search?: string) => {
    try {
      setIsLoading(true);
      const url = search
        ? `/api/products?search=${encodeURIComponent(search)}`
        : "/api/products";

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
        setError("");
      } else {
        setError(data.error || "Бүтээгдэхүүн татахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      setError("Бүтээгдэхүүн татахад алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length >= 2 || term.length === 0) {
      fetchProducts(term);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === products.length
        ? []
        : products.map((p) => p.id)
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) return;

    const confirmDelete = confirm(
      `Сонгосон ${selectedProducts.length} бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?`
    );

    if (confirmDelete) {
      try {
        const deletePromises = selectedProducts.map((id) =>
          fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: JSON.stringify(user),
            },
          })
        );

        await Promise.all(deletePromises);
        alert("Сонгосон бүтээгдэхүүнүүд амжилттай устгагдлаа!");
        setSelectedProducts([]);
        fetchProducts(searchTerm);
      } catch (error) {
        console.error("Delete error:", error);
        alert("Устгахад алдаа гарлаа");
      }
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const confirmDelete = confirm(
      `"${product.name}" бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/products/${product.id}`, {
          method: "DELETE",
          headers: {
            Authorization: JSON.stringify(user),
          },
        });

        if (response.ok) {
          alert("Бүтээгдэхүүн амжилттай устгагдлаа!");
          fetchProducts(searchTerm);
        } else {
          const data = await response.json();
          alert(data.error || "Устгахад алдаа гарлаа");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Устгахад алдаа гарлаа");
      }
    }
  };

  const handleEditProduct = (id: string) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const handleViewProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Бүтээгдэхүүний жагсаалт
            </h1>
            <p className="mt-1 lg:mt-2 text-sm lg:text-base text-gray-700 font-medium">
              Нийт {products.length} бүтээгдэхүүн бүртгэгдсэн
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/products/create")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base"
          >
            <span>➕</span>
            <span className="hidden sm:inline">Шинэ бүтээгдэхүүн</span>
            <span className="sm:hidden">Нэмэх</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Search and Actions */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
            <div className="flex-1 lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Бүтээгдэхүүний нэр, үйлдвэрлэгч эсвэл баркодоор хайх..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm lg:text-base"
                />
                <svg
                  className="absolute left-3 top-2.5 lg:top-3.5 w-4 h-4 lg:w-5 lg:h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs lg:text-sm text-gray-700 font-semibold">
                  {selectedProducts.length} сонгогдсон
                </span>
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-xs lg:text-sm"
                >
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Устгах</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-8 text-center border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Уншиж байна...</p>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-8 lg:p-12 text-center border border-gray-200">
            <span className="text-5xl lg:text-6xl mb-4 block">📦</span>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "Хайлтын үр дүн олдсонгүй" : "Бүтээгдэхүүн байхгүй"}
            </h3>
            <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 px-4">
              {searchTerm
                ? `"${searchTerm}" гэсэн хайлтаар бүтээгдэхүүн олдсонгүй.`
                : "Эхлээд шинэ бүтээгдэхүүн нэмнэ үү."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => router.push("/admin/products/create")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
              >
                Шинэ бүтээгдэхүүн нэмэх
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedProducts.length === products.length &&
                            products.length > 0
                          }
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Бүтээгдэхүүн
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Баркод
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ангилал
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Үнэ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Нөөц
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Үйлдэл
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {product.imageUrl ? (
                                <div className="relative h-10 w-10 rounded overflow-hidden">
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                  <span className="text-xl">
                                    {product.categories[0]?.icon || "📦"}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.nameMn}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {product.barcode}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.categories.length > 0 ? (
                              product.categories.map((cat) => (
                                <span
                                  key={cat.id}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {cat.icon && (
                                    <span className="mr-1">{cat.icon}</span>
                                  )}
                                  {cat.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.price ? `${product.price}₮` : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.inStock
                              ? `${product.stockQuantity} ш`
                              : "Дууссан"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewProduct(product.id)}
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                              title="Үзэх"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEditProduct(product.id)}
                              className="text-gray-600 hover:text-yellow-600 transition-colors"
                              title="Засах"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              className="text-gray-600 hover:text-red-600 transition-colors"
                              title="Устгах"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">
                            {product.nameMn}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.categories.map((cat) => (
                              <span
                                key={cat.id}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800"
                              >
                                {cat.icon && (
                                  <span className="mr-1">{cat.icon}</span>
                                )}
                                {cat.name}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                              {product.barcode}
                            </span>
                            {product.price && (
                              <span className="font-medium text-gray-900">
                                {product.price}₮
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full font-medium ${
                                product.inStock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.inStock
                                ? `${product.stockQuantity} ш`
                                : "Дууссан"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleViewProduct(product.id)}
                          className="text-gray-600 hover:text-blue-600 p-2"
                          title="Үзэх"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="text-gray-600 hover:text-yellow-600 p-2"
                          title="Засах"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="text-gray-600 hover:text-red-600 p-2"
                          title="Устгах"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <ProductsList />
    </ProtectedRoute>
  );
}
