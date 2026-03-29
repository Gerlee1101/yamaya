interface CategoryHeaderProps {
  onAddClick: () => void;
}

export default function CategoryHeader({ onAddClick }: CategoryHeaderProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Ангиллууд
        </h1>
        <p className="mt-1 text-sm text-gray-700 font-medium">
          Бүтээгдэхүүний ангиллуудыг удирдах
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Шинэ ангилал
      </button>
    </div>
  );
}
