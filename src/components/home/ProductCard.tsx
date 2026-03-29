import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Package, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "../products";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.salePercent && product.salePercent > 0;
  const discountedPrice = hasDiscount
    ? (parseFloat(product.price || "0") * (100 - (product.salePercent || 0))) /
      100
    : parseFloat(product.price || "0");

  return (
    <Link href={`/product/${product.barcode}`}>
      <Card className="group relative overflow-hidden border-0 bg-white shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 h-full">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-125"
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-12 w-12 text-slate-300 group-hover:text-slate-400 transition-colors" />
              </div>
            )}

            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-xl animate-pulse">
                -{product.salePercent}%
              </div>
            )}

            {/* Quick Add Button */}
            {product.inStock && (
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button
                  size="sm"
                  className="bg-white/95 text-slate-700 hover:bg-white hover:text-red-600 shadow-xl backdrop-blur-sm border-0 h-8 w-8 p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Adding to cart:", product.name);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
            {/* Category */}
            {product.categories.length > 0 && (
              <div className="flex">
                <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-2 py-1 rounded-full border border-red-100">
                  {product.categories[0].icon &&
                    `${product.categories[0].icon} `}
                  {product.categories[0].name}
                </span>
              </div>
            )}

            <div className="space-y-2 flex-1">
              {/* Product Name */}
              <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                {product.name}
              </h4>

              {/* Mongolian Name */}
              <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                {product.nameMn}
              </p>
            </div>

            {/* Price */}
            <div className="pt-2 border-t border-slate-100">
              {product.price ? (
                <div className="flex items-baseline justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-slate-900">
                        {discountedPrice.toLocaleString()}₮
                      </span>
                      {hasDiscount ? (
                        <span className="text-xs text-slate-400 line-through">
                          {parseFloat(product.price).toLocaleString()}₮
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {product.weight && (
                    <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                      {product.weight}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">
                    Үнэ тодорхойгүй
                  </span>
                  {product.weight && (
                    <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                      {product.weight}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
