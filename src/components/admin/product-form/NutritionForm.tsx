"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { NutritionField } from "./types";

interface NutritionFormProps {
  nutritionFields: NutritionField[];
  nutritionServingSize: string;
  onFieldChange: (
    index: number,
    field: "label" | "value",
    value: string
  ) => void;
  onServingSizeChange: (value: string) => void;
  onAddField: () => void;
  onRemoveField: (index: number) => void;
}

export default function NutritionForm({
  nutritionFields,
  nutritionServingSize,
  onFieldChange,
  onServingSizeChange,
  onAddField,
  onRemoveField,
}: NutritionFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Тэжээллэг чанар</span>
          <Button
            type="button"
            onClick={onAddField}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Нэмэх
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Хэмжээ (Тэжээллэг чанарын үзүүлэлтүүд ямар хэмжээнд)
          </label>
          <Input
            type="text"
            value={nutritionServingSize}
            onChange={(e) => onServingSizeChange(e.target.value)}
            placeholder="Жишээ нь: 100г, 1 ширхэг"
          />
        </div>

        {nutritionFields.map((field, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Шинж чанар
              </label>
              <Input
                type="text"
                value={field.label}
                onChange={(e) => onFieldChange(index, "label", e.target.value)}
                placeholder="Жишээ нь: Илчлэг"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Утга
              </label>
              <Input
                type="text"
                value={field.value}
                onChange={(e) => onFieldChange(index, "value", e.target.value)}
                placeholder="Жишээ нь: 150kcal"
              />
            </div>
            <Button
              type="button"
              onClick={() => onRemoveField(index)}
              variant="outline"
              size="icon"
              className="w-8 h-8"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}

        {nutritionFields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">
              Тэжээллэг чанарын мэдээлэл нэмэгдээгүй байна
            </p>
            <Button
              type="button"
              onClick={onAddField}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              Анхны талбар нэмэх
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
