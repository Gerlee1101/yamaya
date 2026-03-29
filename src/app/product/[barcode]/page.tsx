"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Product } from "@/components/products/types";
import {
  ProductDetail,
  LoadingSpinner,
  ErrorState,
} from "@/components/product-detail";

interface ApiResponse {
  success: boolean;
  product: Product;
}

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const barcode = params.barcode as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${barcode}`);
        const data: ApiResponse = await response.json();

        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError("Бүтээгдэхүүн олдсонгүй");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Бүтээгдэхүүн ачааллахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <ErrorState
        error={error}
        barcode={barcode}
        onBackClick={() => router.push("/")}
      />
    );
  }

  return (
    <ProductDetail
      product={product}
      onBackClick={() => router.push("/")}
      onScanMoreClick={() => router.push("/barcode-scanner")}
      onViewAllClick={() => router.push("/products")}
    />
  );
}
