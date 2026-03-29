"use client";

import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

interface Stats {
  totalProducts: number;
  categoriesCount: number;
  recentScans: number;
  dailyViews: number;
}

export default function StatsGrid() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    categoriesCount: 0,
    recentScans: 0,
    dailyViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200 animate-pulse"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg"></div>
              <div className="ml-3 lg:ml-4 flex-1">
                <div className="h-6 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
      <StatsCard
        icon="📦"
        value={stats.totalProducts}
        label="Нийт бүтээгдэхүүн"
        bgColor="bg-blue-100"
      />
      <StatsCard
        icon="🏷️"
        value={stats.categoriesCount}
        label="Ангилал"
        bgColor="bg-green-100"
      />
      <StatsCard
        icon="📱"
        value={stats.recentScans}
        label="Өнөөдрийн скан"
        bgColor="bg-yellow-100"
      />
      <StatsCard
        icon="👁️"
        value={stats.dailyViews}
        label="Өнөөдрийн үзэлт"
        bgColor="bg-red-100"
      />
    </div>
  );
}
