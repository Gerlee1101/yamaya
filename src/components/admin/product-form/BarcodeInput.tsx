"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scan } from "lucide-react";

interface BarcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function BarcodeInput({
  value,
  onChange,
  required = false,
}: BarcodeInputProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleScannerRedirect = () => {
    setIsNavigating(true);
    // Store the current form data in sessionStorage to preserve it
    const currentPath = window.location.pathname;
    sessionStorage.setItem("returnPath", currentPath);
    sessionStorage.setItem("barcodeInputTarget", "true");

    // Navigate to barcode scanner
    router.push("/barcode-scanner");
  };

  // Listen for barcode results from scanner
  useEffect(() => {
    // Check if there's a scanned barcode on component mount
    const scannedBarcode = sessionStorage.getItem("scannedBarcode");
    if (scannedBarcode && sessionStorage.getItem("barcodeInputTarget")) {
      onChange(scannedBarcode);
      sessionStorage.removeItem("scannedBarcode");
      sessionStorage.removeItem("barcodeInputTarget");
    }
  }, [onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Баркод {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="4902430123456"
          required={required}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleScannerRedirect}
          disabled={isNavigating}
          variant="outline"
          size="icon"
        >
          <Scan className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
