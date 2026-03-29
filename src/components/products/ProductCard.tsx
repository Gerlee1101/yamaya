import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export function ProductCard({
  product,
  showAddToCart = true,
}: ProductCardProps) {
  const hasDiscount = product.salePercent && product.salePercent > 0;
  const discountedPrice = hasDiscount
    ? (parseFloat(product.price || "0") * (100 - (product.salePercent || 0))) /
      100
    : parseFloat(product.price || "0");

  return (
    <Link href={`/product/${product.barcode}`}>
      <Card className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-16 w-16 text-slate-300" />
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Discount Badge */}
            {hasDiscount && (
              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white shadow-lg font-bold">
                <Tag className="w-3 h-3 mr-1" />-{product.salePercent}%
              </Badge>
            )}

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                <Badge variant="destructive" className="font-semibold">
                  Дууссан
                </Badge>
              </div>
            )}

            {/* Add to Cart Button (appears on hover) */}
            {showAddToCart && product.inStock && (
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  className="bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900 shadow-lg backdrop-blur-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic here
                    console.log("Adding to cart:", product.name);
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            {/* Category */}
            {product.categories.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium">
                {product.categories[0].icon && `${product.categories[0].icon} `}
                {product.categories[0].name}
              </Badge>
            )}

            {/* Product Name */}
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1">
                {product.nameMn}
              </p>
            </div>

            {/* Manufacturer */}
            <p className="text-xs text-slate-500 font-medium">
              {product.manufacturer}
            </p>

            {/* Price and Weight */}
            <div className="flex items-end justify-between pt-2">
              <div className="space-y-1">
                {product.price ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        {discountedPrice.toLocaleString()}₮
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-slate-400 line-through">
                          {parseFloat(product.price).toLocaleString()}₮
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-slate-500 font-medium">
                    Үнэ тодорхойгүй
                  </span>
                )}
              </div>

              {product.weight && (
                <Badge variant="outline" className="text-xs font-medium">
                  {product.weight}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
