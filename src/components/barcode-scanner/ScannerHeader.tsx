"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ScannerHeaderProps {
  onGoHome: () => void;
}

export default function ScannerHeader({ onGoHome }: ScannerHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <Button onClick={onGoHome} variant="ghost" size="icon">
            <ArrowLeft />
          </Button>

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
