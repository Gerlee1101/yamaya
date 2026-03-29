import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";

// Helper to verify auth from request
function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  try {
    const userData = JSON.parse(authHeader);
    return userData;
  } catch {
    return null;
  }
}

// GET /api/categories - List all categories (public)
export async function GET() {
  try {
    const allCategories = await db.select().from(categories);

    return NextResponse.json({
      success: true,
      categories: allCategories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json(
      { error: "Категори авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create new category (admin only)
export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Зөвхөн админ хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { name, description, icon } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: "Нэр шаардлагатай" },
        { status: 400 }
      );
    }

    // Generate ID
    const id = `cat-${Date.now()}`;

    // Create new category
    const [newCategory] = await db
      .insert(categories)
      .values({
        id,
        name,
        description: description || null,
        icon: icon || "📦",
      })
      .returning();

    return NextResponse.json({
      success: true,
      category: newCategory,
      message: "Категори амжилттай үүсгэгдлээ",
    });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Категори үүсгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
