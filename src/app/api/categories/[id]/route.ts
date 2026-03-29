import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories, productsToCategories } from "@/db/schema";
import { eq } from "drizzle-orm";

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

// GET /api/categories/[id] - Get category by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!category) {
      return NextResponse.json(
        { error: "Категори олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category error:", error);
    return NextResponse.json(
      { error: "Категори авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update category (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Зөвхөн админ хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, icon } = body;

    // Check if category exists
    const [existing] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!existing) {
      return NextResponse.json(
        { error: "Категори олдсонгүй" },
        { status: 404 }
      );
    }

    // Update category
    const [updated] = await db
      .update(categories)
      .set({
        name: name || existing.name,
        description: description !== undefined ? description : existing.description,
        icon: icon || existing.icon,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      category: updated,
      message: "Категори амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Категори шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete category (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Зөвхөн админ хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;

    // Check if category exists
    const [existing] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!existing) {
      return NextResponse.json(
        { error: "Категори олдсонгүй" },
        { status: 404 }
      );
    }

    // Check if category has products
    const categoryProducts = await db
      .select()
      .from(productsToCategories)
      .where(eq(productsToCategories.categoryId, id));

    if (categoryProducts.length > 0) {
      return NextResponse.json(
        { error: `Энэ категорид ${categoryProducts.length} бүтээгдэхүүн байгаа тул устгах боломжгүй` },
        { status: 400 }
      );
    }

    // Delete category
    await db.delete(categories).where(eq(categories.id, id));

    return NextResponse.json({
      success: true,
      message: "Категори амжилттай устгагдлаа",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Категори устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
