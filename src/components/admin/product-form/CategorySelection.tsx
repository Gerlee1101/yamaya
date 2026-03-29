"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "./types";

interface CategorySelectionProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
}

export default function CategorySelection({
  categories,
  selectedCategories,
  onCategoryToggle,
}: CategorySelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Ангилал сонгох <span className="text-red-500">*</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <Button
                key={category.id}
                type="button"
                onClick={() => onCategoryToggle(category.id)}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className="justify-start h-auto py-2 px-3"
              >
                <div className="flex items-center gap-2">
                  {category.icon && (
                    <span className="text-lg">{category.icon}</span>
                  )}
                  <span className="text-xs font-medium">{category.name}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {selectedCategories.length === 0 && (
          <p className="text-sm text-red-600 mt-2">
            Наад зах нь нэг ангилал сонгоно уу
          </p>
        )}
      </CardContent>
    </Card>
  );
}
