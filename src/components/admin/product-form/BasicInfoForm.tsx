"use client";

import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BarcodeInput from "./BarcodeInput";
import ImageUpload from "./ImageUpload";
import { ProductFormData } from "./types";

interface BasicInfoFormProps {
  formData: ProductFormData;
  onFieldChange: (field: keyof ProductFormData, value: string) => void;
}

export default function BasicInfoForm({
  formData,
  onFieldChange,
}: BasicInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Үндсэн мэдээлэл</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Barcode with Scanner Integration */}
          <div className="md:col-span-2">
            <BarcodeInput
              value={formData.barcode}
              onChange={(value) => onFieldChange("barcode", value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <ImageUpload
              value={formData.imageUrl}
              onChange={(value: string) => onFieldChange("imageUrl", value)}
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Бүтээгдэхүүний нэр <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
              placeholder="Жишээ нь: Coca Cola 330ml"
              required
            />
          </div>

          {/* Mongolian Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Монгол нэр <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.nameMn}
              onChange={(e) => onFieldChange("nameMn", e.target.value)}
              placeholder="Жишээ нь: Кока Кола 330мл"
              required
            />
          </div>

          {/* Manufacturer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Үйлдвэрлэгч <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.manufacturer}
              onChange={(e) => onFieldChange("manufacturer", e.target.value)}
              placeholder="Жишээ нь: The Coca-Cola Company"
              required
            />
          </div>

          {/* Importer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Импортлогч
            </label>
            <Input
              type="text"
              value={formData.importer}
              onChange={(e) => onFieldChange("importer", e.target.value)}
              placeholder="Импортлогч компани"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Утас
            </label>
            <Input
              type="text"
              value={formData.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              placeholder="77096060"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Жин/Хэмжээ
            </label>
            <Input
              type="text"
              value={formData.weight}
              onChange={(e) => onFieldChange("weight", e.target.value)}
              placeholder="330мл / 500г"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
