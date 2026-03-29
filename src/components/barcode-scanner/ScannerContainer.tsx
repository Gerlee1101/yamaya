"use client";

import dynamic from "next/dynamic";
import { Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
// import { DetectedBarcode } from "./types";
import ScannerLoading from "./ScannerLoading";

const BarcodeScanner = dynamic(
  () =>
    import("@thewirv/react-barcode-scanner").then((mod) => mod.BarcodeScanner),
  {
    ssr: false,
    loading: () => <ScannerLoading />,
  }
);

interface ScannerContainerProps {
  isScanning: boolean;
  scanResult: string;
  error: string;
  onCapture: (barcodes: string) => void;
}

export default function ScannerContainer({
  isScanning,
  scanResult,
  error,
  onCapture,
}: ScannerContainerProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden relative">
        {/* Simple scanning indicator */}
        {isScanning && !scanResult && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="border-2 border-red-500 border-dashed rounded-lg p-8">
              <p className="text-white text-sm text-center">
                Баркодыг энд байрлуулна уу
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {scanResult && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-green-500/20">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-white font-medium">Амжилттай илрүүлсэн!</p>
              <p className="text-white text-sm">Баркод: {scanResult}</p>
            </div>
          </div>
        )}

        {/* Camera Feed */}
        <div className="w-full h-full">
          {isScanning && !error ? (
            <BarcodeScanner
              onSuccess={onCapture}
              onError={(error) =>
                console.error("Barcode Scanner Error:", error)
              }
              containerStyle={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-red-50">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 font-medium">Алдаа гарлаа</p>
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Сканнер зогссон</p>
                <p className="text-gray-500 text-sm">
                  Дахин эхлүүлэх товчийг дарна уу
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
