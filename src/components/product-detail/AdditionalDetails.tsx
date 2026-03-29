import type { Product } from "@/components/products/types";

interface AdditionalDetailsProps {
  product: Product;
}

export default function AdditionalDetails({ product }: AdditionalDetailsProps) {
  // Check if there's any nutrition data (new or legacy)
  const hasNutritionData = product.nutrition && product.nutrition.length > 0;
  const hasLegacyNutrition =
    product.nutritionCalories ||
    product.nutritionProtein ||
    product.nutritionCarbs ||
    product.nutritionFat ||
    product.nutritionSodium;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          {(hasNutritionData || hasLegacyNutrition) && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Жин
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {product.weight || "Тодорхойгүй"}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                    Тэжээллэг чанар
                  </h3>

                  <p className="text-sm">{product.nutritionServingSize}</p>
                </div>

                <div>
                  {/* Dynamic nutrition data */}
                  {hasNutritionData &&
                    product.nutrition?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                          {item.value}
                        </span>
                      </div>
                    ))}

                  {/* Legacy nutrition data */}
                  {hasLegacyNutrition && !hasNutritionData && (
                    <>
                      {product.nutritionCalories && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-700">
                            Калори
                          </span>
                          <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                            {product.nutritionCalories}
                          </span>
                        </div>
                      )}
                      {product.nutritionProtein && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-700">
                            Уураг
                          </span>
                          <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                            {product.nutritionProtein}
                          </span>
                        </div>
                      )}
                      {product.nutritionCarbs && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-700">
                            Нүүрс ус
                          </span>
                          <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                            {product.nutritionCarbs}
                          </span>
                        </div>
                      )}
                      {product.nutritionFat && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-700">
                            Өөх тос
                          </span>
                          <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                            {product.nutritionFat}
                          </span>
                        </div>
                      )}
                      {product.nutritionSodium && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm font-medium text-gray-700">
                            Натри
                          </span>
                          <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                            {product.nutritionSodium}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Special Notes */}
              {product.note && (
                <div className=" bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Санамж
                  </h3>
                  <p className="text-amber-800 font-medium leading-relaxed">
                    {product.note}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Орц найрлага
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.ingredients || "Орц найрлагын мэдээлэл байхгүй"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Хадгалах нөхцөл
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.storageInstructions}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Хадгалах хугацаа
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.storageDuration ||
                    product.expiryDate ||
                    "Тодорхойгүй"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Дуусах хугацаа
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Дуусах хугацааг бүтээгдэхүүний амраас харна уу.
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="lg:col-span-2">
            {/* Allergens */}
            {product.allergens && (
              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Харшлын анхааруулга
                </h3>
                <p className="text-orange-800 font-medium">
                  {product.allergens}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
