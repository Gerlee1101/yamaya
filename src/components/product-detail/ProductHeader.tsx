import Image from "next/image";

interface ProductHeaderProps {
  onBackClick: () => void;
}

export default function ProductHeader({ onBackClick }: ProductHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={onBackClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <Image
            src="/logo.png"
            alt="Yamaya Trade"
            width={180}
            height={45}
            className="object-contain"
          />
        </div>
      </div>
    </header>
  );
}
