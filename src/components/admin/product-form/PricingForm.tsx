"use client";

import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductFormData } from "./types";

interface PricingFormProps {
  formData: ProductFormData;
  onFieldChange: (field: keyof ProductFormData, value: string) => void;
}

export default function PricingForm({
  formData,
  onFieldChange,
}: PricingFormProps) {
  const calculateDiscountedPrice = () => {
    const priceNum = parseFloat(formData.price) || 0;
    const saleNum = parseFloat(formData.salePercent) || 0;
    if (saleNum > 0 && priceNum > 0) {
      const discounted = priceNum * (1 - saleNum / 100);
      return discounted.toFixed(2);
    }
    return null;
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Үнэ болон хөнгөлөлт</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Үнэ (₮)
            </label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => onFieldChange("price", e.target.value)}
              placeholder="15000"
              step="0.01"
              min="0"
            />
          </div>

          {/* Sale Percent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Хөнгөлөлт (%)
            </label>
            <Input
              type="number"
              value={formData.salePercent}
              onChange={(e) => onFieldChange("salePercent", e.target.value)}
              placeholder="0"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Discounted Price Display */}
        {discountedPrice && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">
                Хөнгөлөлттэй үнэ:
              </span>
              <span className="text-lg font-bold text-green-900">
                {discountedPrice}₮
              </span>
            </div>
            <div className="text-xs text-green-600 mt-1">
              Анхны үнэ: {formData.price}₮ ({formData.salePercent}% хөнгөлөлт)
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
