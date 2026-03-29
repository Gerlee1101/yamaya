import { getProductEmoji } from "./utils";
import Image from "next/image";

interface ProductImageProps {
  productName: string;
  imageUrl?: string;
}

export default function ProductImage({
  productName,
  imageUrl,
}: ProductImageProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-1 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-sm">
        <div className="relative">
          {imageUrl ? (
            <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <Image
                src={imageUrl}
                alt={productName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl"></div>
            </div>
          ) : (
            <div className="w-64 h-64 mx-auto bg-white rounded-2xl shadow-xl flex items-center justify-center relative">
              <div className="text-8xl">{getProductEmoji(productName)}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 to-transparent rounded-2xl"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
