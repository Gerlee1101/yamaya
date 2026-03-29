"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Зураг
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Product preview"
            width={200}
            height={200}
            className="rounded-lg border border-gray-300 object-cover"
          />
          <Button
            type="button"
            onClick={handleRemoveImage}
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 w-6 h-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full sm:w-auto h-32 border-dashed border-2 flex flex-col items-center justify-center gap-2"
        >
          <Upload className="w-6 h-6" />
          <span>Зураг сонгох</span>
        </Button>
      )}
    </div>
  );
}
