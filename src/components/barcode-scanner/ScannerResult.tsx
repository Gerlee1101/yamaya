"use client";

import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ScannerResultProps {
  scanResult: string;
}

export default function ScannerResult({ scanResult }: ScannerResultProps) {
  if (!scanResult) return null;

  return (
    <Card className="bg-green-50 border-green-200">
      <div className="flex items-center space-x-3">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <div>
          <p className="font-medium text-green-900">Баркод илрүүлсэн</p>
          <p className="text-green-700 font-mono">{scanResult}</p>
        </div>
      </div>
    </Card>
  );
}
