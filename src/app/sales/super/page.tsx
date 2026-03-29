"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ProductsGrid,
  ProductsPagination,
  type Product,
  type PaginationInfo,
  type ApiResponse,
} from "@/components/products";

export default function SuperSalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          isSuperSale: "true",
        });

        const response = await fetch(`/api/products?${params}`);
        const data: ApiResponse = await response.json();

        if (data.success) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page: number) => {
    setLoading(true);
    const fetchProductsPage = async () => {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          isSuperSale: "true",
        });

        const response = await fetch(`/api/products?${params}`);
        const data: ApiResponse = await response.json();

        if (data.success) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsPage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Буцах
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4 animate-bounce">
              <span className="text-6xl">🔥</span>
              <span className="text-6xl">⚡</span>
              <span className="text-6xl">💥</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-pulse">
              СУПЕР ХЯМДРАЛ!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl mx-auto font-semibold">
              Энэ боломжийг бүү алдаарай!
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50">
                <span className="text-lg font-bold">
                  🎁 {products.length} онцгой санал
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 && !loading ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">😢</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Супер хямдралтай бүтээгдэхүүн одоогоор байхгүй байна
            </h3>
            <p className="text-gray-600 mb-6">
              Удахгүй шинэ хямдралууд нэмэгдэх болно!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Бүх бүтээгдэхүүн үзэх
            </Link>
          </div>
        ) : (
          <>
            <ProductsGrid
              products={products}
              viewMode="grid"
              loading={loading}
            />

            {products.length > 12 && (
              <ProductsPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
