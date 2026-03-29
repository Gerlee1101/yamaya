"use client";

import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminHeader from "./admin/AdminHeader";
import AdminSidebar from "./admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
}

const navigationSections: NavSection[] = [
  {
    title: "Үндсэн",
    items: [{ name: "Хянах самбар", href: "/admin", icon: "📊" }],
    adminOnly: true,
  },
  {
    title: "Бүтээгдэхүүн",
    items: [
      {
        name: "Бүтээгдэхүүн нэмэх",
        href: "/admin/products/create",
        icon: "➕",
      },
      { name: "Жагсаалт", href: "/admin/products", icon: "📦" },
    ],
  },
  {
    title: "Ангилал",
    items: [
      {
        name: "Ангиллууд",
        href: "/admin/categories",
        icon: "🏷️",
        adminOnly: true,
      },
    ],
    adminOnly: true,
  },
  {
    title: "Хэрэглэгчид",
    items: [
      {
        name: "Хэрэглэгчид",
        href: "/admin/users",
        icon: "👥",
        adminOnly: true,
      },
    ],
    adminOnly: true,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        userName={user?.name}
        userRole={user?.role}
        onMenuClick={() => setIsSidebarOpen(true)}
        onLogout={logout}
      />

      <div className="flex">
        <AdminSidebar
          isMobileOpen={isSidebarOpen}
          onMobileClose={() => setIsSidebarOpen(false)}
          navigationSections={navigationSections}
          isAdmin={isAdmin()}
        />

        <main className="flex-1 p-4 lg:p-8 w-full min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
