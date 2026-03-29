import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { count } from "drizzle-orm";

// GET /api/stats - Get dashboard statistics
export async function GET() {
  try {
    // Get total products count
    const [productsCount] = await db
      .select({ count: count() })
      .from(products);

    // Get total categories count
    const [categoriesCount] = await db
      .select({ count: count() })
      .from(categories);

    // For now, we'll return mock data for scans and views
    // These would typically come from analytics or tracking tables
    const stats = {
      totalProducts: productsCount.count || 0,
      categoriesCount: categoriesCount.count || 0,
      recentScans: 0, // TODO: Implement scan tracking
      dailyViews: 0, // TODO: Implement view tracking
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
