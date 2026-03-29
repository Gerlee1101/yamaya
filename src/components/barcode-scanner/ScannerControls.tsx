"use client";

import { Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScannerControlsProps {
  isScanning: boolean;
  isRedirecting: boolean;
  onStartScanner: () => void;
  onStopScanner: () => void;
}

export default function ScannerControls({
  isScanning,
  isRedirecting,
  onStartScanner,
  onStopScanner,
}: ScannerControlsProps) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onStartScanner}
        disabled={isScanning || isRedirecting}
        variant="destructive"
        size="lg"
        className="flex-1"
      >
        <Scan />
        {isScanning
          ? "Сканнердаж байна..."
          : isRedirecting
          ? "Шилжиж байна..."
          : "Эхлүүлэх"}
      </Button>

      <Button
        onClick={onStopScanner}
        disabled={!isScanning && !isRedirecting}
        variant="secondary"
        size="lg"
      >
        Зогсоох
      </Button>
    </div>
  );
}
