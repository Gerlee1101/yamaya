import type { Product } from "@/components/products/types";

interface PriceInfoProps {
  product: Product;
}

export default function PriceInfo({ product }: PriceInfoProps) {
  if (!product.price) return null;

  const originalPrice = parseFloat(product.price);
  const salePrice =
    product.salePercent && product.salePercent > 0
      ? (originalPrice * (100 - product.salePercent)) / 100
      : originalPrice;

  return (
    <div className="p-4 rounded-lg flex items-center justify-between mb-4 border bg-gradient-to-br from-gray-50 to-gray-100">
      <h3 className="text-lg font-semibold">Үнэ:</h3>

      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-2xl font-bold">
          {salePrice.toLocaleString()}₮
        </span>
      </div>
    </div>
  );
}
