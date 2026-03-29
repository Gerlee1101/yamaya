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
import { format } from "date-fns";

export default function MonthlyDealsPage() {
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

  const currentMonth = format(new Date(), "MM-р сарын");

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          isMonthlyDeal: "true",
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
          isMonthlyDeal: "true",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <div className="inline-flex items-center justify-center mb-4">
              <span className="text-6xl">📅</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentMonth} Хямдрал
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Энэ сарын онцлох хямдралууд!
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-medium">
                  🛍️ {pagination.totalCount} бүтээгдэхүүн
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-medium">⚡ Хэмнэлттэй</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductsGrid products={products} viewMode="grid" loading={loading} />

        <ProductsPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
