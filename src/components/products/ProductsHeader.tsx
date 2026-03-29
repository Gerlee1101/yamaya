import { Button } from "@/components/ui/button";
import { Package, Grid, List, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ViewMode } from "./types";

interface ProductsHeaderProps {
  totalCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ProductsHeader({
  totalCount,
  viewMode,
  onViewModeChange,
}: ProductsHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              {/* Back to Home Button */}
              <Link href="/">
                <Button variant="outline" size="sm" className="mt-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Нүүр
                </Button>
              </Link>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Package className="h-8 w-8 text-red-600" />
                  Бүтээгдэхүүнүүд
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {totalCount} бүтээгдэхүүн олдлоо
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
