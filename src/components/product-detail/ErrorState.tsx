interface ErrorStateProps {
  error?: string;
  barcode?: string;
  onBackClick: () => void;
}

export default function ErrorState({
  error,
  barcode,
  onBackClick,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Бүтээгдэхүүн олдсонгүй
        </h1>
        <p className="text-gray-600 mb-6">
          {error ||
            `Уучлаарай, энэ баркод бүхий бүтээгдэхүүн олдсонгүй: ${barcode}`}
        </p>
        <button
          onClick={onBackClick}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors"
        >
          Нүүр хуудас руу буцах
        </button>
      </div>
    </div>
  );
}
