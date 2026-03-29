"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ProductsHeader,
  ProductsFilters,
  ProductsGrid,
  ProductsPagination,
  type Product,
  type Category,
  type PaginationInfo,
  type ApiResponse,
  type ViewMode,
} from "@/components/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with current filters
  const fetchProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
        });

        if (searchQuery) params.set("search", searchQuery);
        if (selectedCategory) params.set("categoryId", selectedCategory);

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
    },
    [pagination.limit, searchQuery, selectedCategory]
  );

  // Initial load and refetch when filters change
  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsHeader
        totalCount={pagination.totalCount}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      <ProductsFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={handleSearch}
        onCategoryChange={handleCategoryChange}
        onClearFilters={clearFilters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ProductsGrid
          products={products}
          viewMode={viewMode}
          loading={loading}
        />

        <ProductsPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}