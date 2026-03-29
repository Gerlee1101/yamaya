import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import Image from "next/image";
import type { Product } from "./types";

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const hasDiscount = product.salePercent && product.salePercent > 0;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="h-8 w-8" />
                </div>
              )}
            </div>

            {hasDiscount && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                -{product.salePercent}%
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.nameMn}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {product.manufacturer}
                </p>

                {product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.categories.map((category) => (
                      <span
                        key={category.id}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {category.icon && `${category.icon} `}
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-1">
                {product.price && (
                  <div className="flex flex-col items-end">
                    {hasDiscount ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          {(
                            (parseFloat(product.price) *
                              (100 - (product.salePercent || 0))) /
                            100
                          ).toLocaleString()}
                          ₮
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {parseFloat(product.price).toLocaleString()}₮
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {parseFloat(product.price).toLocaleString()}₮
                      </span>
                    )}
                  </div>
                )}
                <span className="text-sm text-gray-500">{product.weight}</span>
                {!product.inStock && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                    Дууссан
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
