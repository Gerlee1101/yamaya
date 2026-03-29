"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductFormData } from "./types";

interface AdditionalDetailsFormProps {
  formData: ProductFormData;
  onFieldChange: (field: keyof ProductFormData, value: string) => void;
}

export default function AdditionalDetailsForm({
  formData,
  onFieldChange,
}: AdditionalDetailsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Нэмэлт мэдээлэл</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Тайлбар
          </label>
          <textarea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onFieldChange("description", e.target.value)
            }
            placeholder="Бүтээгдэхүүний дэлгэрэнгүй тайлбар..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Найрлага
          </label>
          <textarea
            value={formData.ingredients}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onFieldChange("ingredients", e.target.value)
            }
            placeholder="Бүтээгдэхүүний найрлага..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Санамж
          </label>
          <textarea
            value={formData.note}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onFieldChange("note", e.target.value)
            }
            placeholder="Нэмэлт санамж..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Storage Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Хадгалах заавар
            </label>
            <Input
              type="text"
              value={formData.storageInstructions}
              onChange={(e) =>
                onFieldChange("storageInstructions", e.target.value)
              }
              placeholder="Жишээ нь: Хүйтэн газар хадгална уу"
            />
          </div>

          {/* Storage Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Хадгалах хугацаа
            </label>
            <Input
              type="text"
              value={formData.storageDuration}
              onChange={(e) => onFieldChange("storageDuration", e.target.value)}
              placeholder="Жишээ нь: 2 жил, 6 сар, 30 хоног"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дуусах хугацаа
            </label>
            <Input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => onFieldChange("expiryDate", e.target.value)}
              placeholder="Дуусах хугацааг бүтээгдэхүүн дээрээс харна уу"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
