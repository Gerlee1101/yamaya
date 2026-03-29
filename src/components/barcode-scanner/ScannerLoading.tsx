"use client";

import { Camera } from "lucide-react";

export default function ScannerLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Камер ачааллаж байна...</p>
      </div>
    </div>
  );
}
