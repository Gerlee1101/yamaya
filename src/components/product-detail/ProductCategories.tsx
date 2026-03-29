import type { Product } from "@/components/products/types";

interface ProductCategoriesProps {
  product: Product;
}

export default function ProductCategories({ product }: ProductCategoriesProps) {
  if (!product.categories || product.categories.length === 0) return null;

  const categoryColors = [
    "bg-blue-100 text-blue-800 border-blue-200",
    "bg-green-100 text-green-800 border-green-200",
    "bg-purple-100 text-purple-800 border-purple-200",
    "bg-orange-100 text-orange-800 border-orange-200",
    "bg-pink-100 text-pink-800 border-pink-200",
    "bg-indigo-100 text-indigo-800 border-indigo-200",
  ];

  return (
    <div className="bg-gray-50 px-8 py-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <svg
            className="w-6 h-6 mr-3 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1zM13 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3zm2 2v-1h1v1h-1z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-900">
            Бүтээгдэхүүний ангилал
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {product.categories.map((category, index) => {
            const colorClass = categoryColors[index % categoryColors.length];

            return (
              <div
                key={category.id}
                className={`${colorClass} border rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105`}
              >
                <div className="text-center space-y-2">
                  {category.icon && (
                    <div className="text-2xl mb-2">{category.icon}</div>
                  )}
                  <div className="font-semibold text-sm leading-tight">
                    {category.name}
                  </div>
                  {category.description && (
                    <div className="text-xs opacity-75 line-clamp-2">
                      {category.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
