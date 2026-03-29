"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-barcode-scanner/polyfill";

import {
  ScannerHeader,
  ScannerContainer,
  ScannerControls,
  ScannerResult,
} from "@/components/barcode-scanner";

export default function BarcodeScannerPage() {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // Check if we need to return to a form after scanning
  const returnPath =
    typeof window !== "undefined" ? sessionStorage.getItem("returnPath") : null;
  const isForBarcodeInput =
    typeof window !== "undefined"
      ? sessionStorage.getItem("barcodeInputTarget") === "true"
      : false;

  // Handle barcode detection
  const handleCapture = (barcode: string) => {
    setScanResult(barcode);
    setIsScanning(false);
    setIsRedirecting(true);

    // Add a slight delay for better UX
    setTimeout(() => {
      if (isForBarcodeInput && returnPath) {
        // Store the scanned barcode for the form to pick up
        sessionStorage.setItem("scannedBarcode", barcode);
        router.push(returnPath);
      } else {
        // Default behavior - go to product page
        router.push(`/product/${barcode}`);
      }
    }, 1500);
  };

  const startScanner = () => {
    setIsScanning(true);
    setError("");
    setScanResult("");
    setIsRedirecting(false);
  };

  const stopScanner = () => {
    setIsScanning(false);
    setIsRedirecting(false);
  };

  const goHome = () => {
    stopScanner();
    if (returnPath) {
      // Clear the barcode input flag and return to form
      sessionStorage.removeItem("barcodeInputTarget");
      router.push(returnPath);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScannerHeader onGoHome={goHome} />

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Information Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800 text-sm font-medium leading-relaxed">
            Үйлчлүүлэгч та бүтээгдэхүүний бар кодыг уншуулж, тухай
            бүтээгдэхүүний дэлгэрэнгүй мэдээллийг монгол хэлээр авна уу.
          </p>
        </div>

        <ScannerContainer
          isScanning={isScanning}
          scanResult={scanResult}
          error={error}
          onCapture={handleCapture}
        />

        <ScannerControls
          isScanning={isScanning}
          isRedirecting={isRedirecting}
          onStartScanner={startScanner}
          onStopScanner={stopScanner}
        />

        {scanResult && <ScannerResult scanResult={scanResult} />}
      </div>
    </div>
  );
}
