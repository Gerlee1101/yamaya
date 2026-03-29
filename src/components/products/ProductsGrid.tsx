import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";
import type { Product, ViewMode } from "./types";

interface ProductsGridProps {
  products: Product[];
  viewMode: ViewMode;
  loading: boolean;
}

export function ProductsGrid({
  products,
  viewMode,
  loading,
}: ProductsGridProps) {
  // Loading skeleton
  if (loading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Бүтээгдэхүүн олдсонгүй
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Өөр түлхүүр үгээр хайж үзээрэй
        </p>
      </div>
    );
  }

  // Products grid/list
  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
