interface ActionButtonsProps {
  onScanMoreClick: () => void;
  onViewAllClick: () => void;
}

export default function ActionButtons({
  onScanMoreClick,
  onViewAllClick,
}: ActionButtonsProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Дараагийн алхам
          </h3>
          <p className="text-gray-600 mb-8">
            Танд өөр бүтээгдэхүүний мэдээлэл хэрэгтэй байна уу?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onScanMoreClick}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px]"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Өөр бүтээгдэхүүн скан хийх</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
              </div>
            </button>

            <div className="flex items-center text-gray-400">
              <div className="w-8 h-px bg-gray-300 hidden sm:block" />
              <span className="mx-3 text-sm">эсвэл</span>
              <div className="w-8 h-px bg-gray-300 hidden sm:block" />
            </div>

            <button
              onClick={onViewAllClick}
              className="group relative bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg min-w-[280px]"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 000 2v9a2 2 0 002 2h1a1 1 0 100-2H5V6a1 1 0 00-1-1zM8 5a1 1 0 000 2h1v9a2 2 0 002 2h5a2 2 0 002-2V7h1a1 1 0 100-2H8zm4 2v8h5V7h-5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Бүх бүтээгдэхүүн үзэх</span>
              </div>
            </button>
          </div>

          {/* Additional helpful info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Хурдан скан хийх</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Дэлгэрэнгүй мэдээлэл</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Найдвартай үйлчилгээ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
