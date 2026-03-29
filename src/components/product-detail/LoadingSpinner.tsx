interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл ачааллаж байна...",
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
