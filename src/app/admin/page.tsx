"use client";

import AdminLayout from "../../components/AdminLayout";
import ProtectedRoute from "../../components/ProtectedRoute";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-4 lg:space-y-6">
        <DashboardHeader />
        <StatsGrid />
        <QuickActions />
      </div>
    </AdminLayout>
  );
}

export default function ProtectedAdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
