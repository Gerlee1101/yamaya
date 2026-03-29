import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, productsToCategories, categories } from "@/db/schema";
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

// GET /api/products/[id] - Get product by ID or barcode
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by barcode
    let [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!product) {
      [product] = await db
        .select()
        .from(products)
        .where(eq(products.barcode, id));
    }

    if (!product) {
      return NextResponse.json(
        { error: "Бүтээгдэхүүн олдсонгүй" },
        { status: 404 }
      );
    }

    // Fetch categories for the product
    const productCategories = await db
      .select({ category: categories })
      .from(productsToCategories)
      .innerJoin(categories, eq(productsToCategories.categoryId, categories.id))
      .where(eq(productsToCategories.productId, product.id));

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        categories: productCategories.map(pc => pc.category),
      },
    });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product (admin or manager)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request);

  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    return NextResponse.json(
      { error: "Зөвхөн админ болон менежер хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Check if product exists
    let [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!existing) {
      [existing] = await db
        .select()
        .from(products)
        .where(eq(products.barcode, id));
    }

    if (!existing) {
      return NextResponse.json(
        { error: "Бүтээгдэхүүн олдсонгүй" },
        { status: 404 }
      );
    }

    // Update product
    const [updated] = await db
      .update(products)
      .set({
        name: body.name || existing.name,
        nameMn: body.nameMn || existing.nameMn,
        manufacturer: body.manufacturer || existing.manufacturer,
        importer: body.importer || existing.importer,
        phone: body.phone !== undefined ? body.phone : existing.phone,
        weight: body.weight !== undefined ? body.weight : existing.weight,
        price: body.price !== undefined ? body.price : existing.price,
        salePercent: body.salePercent !== undefined ? body.salePercent : existing.salePercent,
        note: body.note !== undefined ? body.note : existing.note,
        description: body.description !== undefined ? body.description : existing.description,
        ingredients: body.ingredients !== undefined ? body.ingredients : existing.ingredients,
        allergens: body.allergens !== undefined ? body.allergens : existing.allergens,
        storageInstructions: body.storageInstructions !== undefined ? body.storageInstructions : existing.storageInstructions,
        storageDuration: body.storageDuration !== undefined ? body.storageDuration : existing.storageDuration,
        expiryDate: body.expiryDate !== undefined ? body.expiryDate : existing.expiryDate,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
        nutrition: body.nutrition !== undefined ? body.nutrition : existing.nutrition,
        nutritionServingSize: body.nutritionServingSize !== undefined ? body.nutritionServingSize : existing.nutritionServingSize,
        nutritionCalories: body.nutritionCalories !== undefined ? body.nutritionCalories : existing.nutritionCalories,
        nutritionProtein: body.nutritionProtein !== undefined ? body.nutritionProtein : existing.nutritionProtein,
        nutritionCarbs: body.nutritionCarbs !== undefined ? body.nutritionCarbs : existing.nutritionCarbs,
        nutritionFat: body.nutritionFat !== undefined ? body.nutritionFat : existing.nutritionFat,
        nutritionSodium: body.nutritionSodium !== undefined ? body.nutritionSodium : existing.nutritionSodium,
        inStock: body.inStock !== undefined ? body.inStock : existing.inStock,
        stockQuantity: body.stockQuantity !== undefined ? body.stockQuantity : existing.stockQuantity,
        isMonthlyDeal: body.isMonthlyDeal !== undefined ? body.isMonthlyDeal : existing.isMonthlyDeal,
        isSuperSale: body.isSuperSale !== undefined ? body.isSuperSale : existing.isSuperSale,
        metadata: body.metadata !== undefined ? body.metadata : existing.metadata,
        updatedAt: new Date(),
      })
      .where(eq(products.id, existing.id))
      .returning();

    // Update categories if provided
    if (body.categoryIds !== undefined) {
      // Delete existing category relationships
      await db
        .delete(productsToCategories)
        .where(eq(productsToCategories.productId, existing.id));

      // Insert new category relationships
      if (Array.isArray(body.categoryIds) && body.categoryIds.length > 0) {
        await db.insert(productsToCategories).values(
          body.categoryIds.map((categoryId: string) => ({
            productId: existing.id,
            categoryId,
          }))
        );
      }
    }

    // Fetch the product with categories
    const productCategories = await db
      .select({ category: categories })
      .from(productsToCategories)
      .innerJoin(categories, eq(productsToCategories.categoryId, categories.id))
      .where(eq(productsToCategories.productId, existing.id));

    return NextResponse.json({
      success: true,
      product: {
        ...updated,
        categories: productCategories.map(pc => pc.category),
      },
      message: "Бүтээгдэхүүн амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (admin only)
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

    // Check if product exists
    let [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!existing) {
      [existing] = await db
        .select()
        .from(products)
        .where(eq(products.barcode, id));
    }

    if (!existing) {
      return NextResponse.json(
        { error: "Бүтээгдэхүүн олдсонгүй" },
        { status: 404 }
      );
    }

    // Delete product
    await db.delete(products).where(eq(products.id, existing.id));

    return NextResponse.json({
      success: true,
      message: "Бүтээгдэхүүн амжилттай устгагдлаа",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
