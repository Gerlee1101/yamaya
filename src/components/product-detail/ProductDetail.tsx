import type { Product } from "@/components/products/types";
import ProductHeader from "./ProductHeader";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import AdditionalDetails from "./AdditionalDetails";
import PriceInfo from "./PriceInfo";
import ProductCategories from "./ProductCategories";
import ActionButtons from "./ActionButtons";

interface ProductDetailProps {
  product: Product;
  onBackClick: () => void;
  onScanMoreClick: () => void;
  onViewAllClick: () => void;
}

export default function ProductDetail({
  product,
  onBackClick,
  onScanMoreClick,
  onViewAllClick,
}: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductHeader onBackClick={onBackClick} />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-4">
          <div className="grid lg:grid-cols-2 gap-2">
            <ProductImage
              productName={product.name}
              imageUrl={product.imageUrl}
            />

            <ProductInfo product={product} />
          </div>

          <AdditionalDetails product={product} />

          <ProductCategories product={product} />
        </div>

        <ActionButtons
          onScanMoreClick={onScanMoreClick}
          onViewAllClick={onViewAllClick}
        />
      </div>
    </div>
  );
}
