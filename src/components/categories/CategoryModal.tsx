"use client";

import { useState, useEffect } from "react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string; icon: string }) => Promise<void>;
  editingCategory: { id: string; name: string; icon: string | null } | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when editingCategory changes
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        icon: editingCategory.icon || "",
      });
    } else {
      setFormData({ name: "", icon: "" });
    }
    setError("");
  }, [editingCategory, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({ name: "", icon: "" });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Алдаа гарлаа";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editingCategory ? "Ангилал засах" : "Шинэ ангилал нэмэх"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Нэр *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Ангиллын нэр"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Эможи
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="🏷️"
            />
            <p className="mt-1 text-xs text-gray-500">
              Эможи оруулна уу (жишээ: 🍬, 🍕, 🍺)
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Хадгалж байна..."
                : editingCategory
                ? "Хадгалах"
                : "Үүсгэх"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
            >
              Болих
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
