import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, productsToCategories, categories } from "@/db/schema";
import { eq, like, or, inArray, and, count } from "drizzle-orm";

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

// GET /api/products - List all products with optional search and category filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const isMonthlyDeal = searchParams.get("isMonthlyDeal") === "true";
    const isSuperSale = searchParams.get("isSuperSale") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = (page - 1) * limit;

    type ProductType = typeof products.$inferSelect;
    let paginatedProducts: ProductType[] = [];
    let totalCount = 0;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(products.name, `%${search}%`),
          like(products.nameMn, `%${search}%`),
          like(products.barcode, `%${search}%`),
          like(products.manufacturer, `%${search}%`)
        )!
      );
    }

    if (isMonthlyDeal) {
      conditions.push(eq(products.isMonthlyDeal, true));
    }

    if (isSuperSale) {
      conditions.push(eq(products.isSuperSale, true));
    }

    if (categoryId) {
      // Filter by category - get product IDs from junction table
      const productIds = await db
        .select({ productId: productsToCategories.productId })
        .from(productsToCategories)
        .where(eq(productsToCategories.categoryId, categoryId));

      if (productIds.length > 0) {
        const ids = productIds.map(p => p.productId);
        conditions.push(inArray(products.id, ids));

        // Get total count with all filters - use COUNT instead of fetching all rows
        const whereClause = conditions.length > 0
          ? and(...conditions)
          : undefined;

        const [{ count: totalCountResult }] = await db
          .select({ count: count() })
          .from(products)
          .where(whereClause);
        totalCount = Number(totalCountResult);

        // Get paginated products with all filters
        paginatedProducts = await db
          .select()
          .from(products)
          .where(whereClause)
          .limit(limit)
          .offset(offset);
      } else {
        totalCount = 0;
        paginatedProducts = [];
      }
    } else {
      // No category filter - get count and paginated products
      const whereClause = conditions.length > 0
        ? and(...conditions)
        : undefined;

      const [{ count: totalCountResult }] = await db
        .select({ count: count() })
        .from(products)
        .where(whereClause);
      totalCount = Number(totalCountResult);

      paginatedProducts = await db
        .select()
        .from(products)
        .where(whereClause)
        .limit(limit)
        .offset(offset);
    }

    // Fetch categories for each product
    const productsWithCategories = await Promise.all(
      paginatedProducts.map(async (product) => {
        const productCategories = await db
          .select({ category: categories })
          .from(productsToCategories)
          .innerJoin(categories, eq(productsToCategories.categoryId, categories.id))
          .where(eq(productsToCategories.productId, product.id));

        return {
          ...product,
          categories: productCategories.map(pc => pc.category),
        };
      })
    );

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      products: productsWithCategories,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (admin or manager)
export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    return NextResponse.json(
      { error: "Зөвхөн админ болон менежер хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const {
      barcode,
      name,
      nameMn,
      manufacturer,
      importer,
      phone,
      weight,
      categoryIds, // Changed from categoryId to categoryIds (array)
      price,
      salePercent,
      note,
      description,
      ingredients,
      allergens,
      storageInstructions,
      storageDuration,
      expiryDate,
      imageUrl,
      nutrition, // New dynamic nutrition array
      nutritionServingSize,
      nutritionCalories,
      nutritionProtein,
      nutritionCarbs,
      nutritionFat,
      nutritionSodium,
      inStock,
      stockQuantity,
      metadata,
      isMonthlyDeal,
      isSuperSale,
    } = body;

    // Validation
    if (!barcode || !name || !nameMn || !manufacturer || !importer) {
      return NextResponse.json(
        { error: "Баркод, нэр, үйлдвэрлэгч, импортлогч шаардлагатай" },
        { status: 400 }
      );
    }

    // Check if barcode already exists
    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.barcode, barcode));

    if (existing) {
      return NextResponse.json(
        { error: "Энэ баркод бүхий бүтээгдэхүүн аль хэдийн бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // Generate ID
    const id = `prod-${Date.now()}`;

    // Create new product
    const [newProduct] = await db
      .insert(products)
      .values({
        id,
        barcode,
        name,
        nameMn,
        manufacturer,
        importer,
        phone: phone || "",
        weight: weight || "",
        price: price || null,
        salePercent: salePercent || 0,
        note: note || null,
        description: description || null,
        ingredients: ingredients || null,
        allergens: allergens || null,
        storageInstructions: storageInstructions || null,
        storageDuration: storageDuration || null,
        expiryDate: expiryDate || null,
        imageUrl: imageUrl || null,
        nutrition: nutrition || null,
        nutritionServingSize: nutritionServingSize || null,
        nutritionCalories: nutritionCalories || null,
        nutritionProtein: nutritionProtein || null,
        nutritionCarbs: nutritionCarbs || null,
        nutritionFat: nutritionFat || null,
        nutritionSodium: nutritionSodium || null,
        inStock: inStock !== undefined ? inStock : true,
        stockQuantity: stockQuantity || 0,
        isMonthlyDeal: isMonthlyDeal || false,
        isSuperSale: isSuperSale || false,
        metadata: metadata || null,
        createdBy: user.id,
      })
      .returning();

    // Insert category relationships if provided
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      await db.insert(productsToCategories).values(
        categoryIds.map((categoryId: string) => ({
          productId: id,
          categoryId,
        }))
      );
    }

    // Fetch the product with categories
    const productCategories = await db
      .select({ category: categories })
      .from(productsToCategories)
      .innerJoin(categories, eq(productsToCategories.categoryId, categories.id))
      .where(eq(productsToCategories.productId, id));

    return NextResponse.json({
      success: true,
      product: {
        ...newProduct,
        categories: productCategories.map(pc => pc.category),
      },
      message: "Бүтээгдэхүүн амжилттай үүсгэгдлээ",
    });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Бүтээгдэхүүн үүсгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
