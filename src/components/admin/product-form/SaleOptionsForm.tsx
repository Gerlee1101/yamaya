import { ProductFormData } from "./types";

interface SaleOptionsFormProps {
  formData: ProductFormData;
  onFieldChange: (field: keyof ProductFormData, value: boolean) => void;
}

export default function SaleOptionsForm({
  formData,
  onFieldChange,
}: SaleOptionsFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🔖</span>
        Хямдралын сонголтууд
      </h2>

      <div className="space-y-4">
        {/* Monthly Deal Checkbox */}
        <div className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
          <input
            type="checkbox"
            id="isMonthlyDeal"
            checked={formData.isMonthlyDeal}
            onChange={(e) => onFieldChange("isMonthlyDeal", e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <div className="flex-1">
            <label
              htmlFor="isMonthlyDeal"
              className="text-base font-medium cursor-pointer flex items-center gap-2"
            >
              <span className="text-xl">📅</span>
              Энэ сарын хямдралд оруулах
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Бүтээгдэхүүн &ldquo;Сарын хямдрал&rdquo; хуудсанд харагдана
            </p>
          </div>
        </div>

        {/* Super Sale Checkbox */}
        <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
          <input
            type="checkbox"
            id="isSuperSale"
            checked={formData.isSuperSale}
            onChange={(e) => onFieldChange("isSuperSale", e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <div className="flex-1">
            <label
              htmlFor="isSuperSale"
              className="text-base font-medium cursor-pointer flex items-center gap-2"
            >
              <span className="text-xl">🔥</span>
              Супер хямдралд оруулах
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Бүтээгдэхүүн &ldquo;Супер хямдрал&rdquo; хуудсанд харагдана
            </p>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-base">💡</span>
            <span>
              <strong>Тайлбар:</strong> Бүтээгдэхүүнийг хоёр хямдралд зэрэг
              оруулж болно. Хямдралын хувийг (%) оруулахаа бүү мартаарай.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
