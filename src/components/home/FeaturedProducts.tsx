"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/components/products/types";
import { ProductCard } from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=6");
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section
      id="products"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Онцлох бүтээгдэхүүн
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Анхааралтайгаар сонгогдсон чанартай Япон хоол хүнсний төрөл бүрийн
            сонголт
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="animate-pulse border-0 shadow-md overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300"></div>
                    <div className="p-4 space-y-3">
                      <div className="bg-slate-200 h-4 rounded-full w-16"></div>
                      <div className="space-y-2">
                        <div className="bg-slate-200 h-4 rounded w-full"></div>
                        <div className="bg-slate-200 h-3 rounded w-3/4"></div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="bg-slate-200 h-5 rounded w-20"></div>
                        <div className="bg-slate-200 h-4 rounded-full w-12"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* View All Products Card */}
            <Link href="/products" className="block h-full">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 h-full">
                <CardContent className="p-0 h-full">
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-6 aspect-square">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0 bg-white/5 bg-opacity-5"
                        style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                          backgroundSize: "20px 20px",
                        }}
                      />
                    </div>

                    <div className="relative z-10 space-y-4">
                      <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-base font-bold">
                          Бүх бүтээгдэхүүн
                        </h4>
                        <p className="text-red-100 text-sm font-medium">
                          {products.length}+ бүтээгдэхүүн
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-red-600 font-semibold transition-all duration-300 group-hover:scale-105"
                      >
                        Бүгдийг үзэх
                      </Button>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
