"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import CategoryHeader from "../../../components/categories/CategoryHeader";
import CategoryTable from "../../../components/categories/CategoryTable";
import CategoryModal from "../../../components/categories/CategoryModal";
import Alert from "../../../components/categories/Alert";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  icon: string | null;
  createdAt: string;
}

function CategoriesManagement() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin");
      return;
    }
    fetchCategories();
  }, [isAdmin, router]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");

      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: { name: string; icon: string }) => {
    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(user),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Амжилттай хадгалагдлаа");
        setShowModal(false);
        setEditingCategory(null);
        fetchCategories();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error(data.error || "Алдаа гарлаа");
      }
    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Та энэ ангиллыг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: JSON.stringify(user),
        },
      });

      if (response.ok) {
        setSuccess("Ангилал устгагдлаа");
        fetchCategories();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Устгахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError("Устгахад алдаа гарлаа");
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setError("");
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CategoryHeader onAddClick={handleAddClick} />

        {success && <Alert type="success" message={success} />}
        {error && <Alert type="error" message={error} />}

        <CategoryTable
          categories={categories}
          isLoading={isLoading}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <CategoryModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingCategory={editingCategory}
        />
      </div>
    </AdminLayout>
  );
}

export default function ProtectedCategoriesManagement() {
  return (
    <ProtectedRoute>
      <CategoriesManagement />
    </ProtectedRoute>
  );
}
