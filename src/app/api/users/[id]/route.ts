import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
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

// GET /api/users/[id] - Get user by ID
export async function GET(
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

  const { id } = await params;
  const [targetUser] = await db.select().from(users).where(eq(users.id, id));

  if (!targetUser) {
    return NextResponse.json(
      { error: "Хэрэглэгч олдсонгүй" },
      { status: 404 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = targetUser;

  return NextResponse.json({
    success: true,
    user: userWithoutPassword,
  });
}

// PUT /api/users/[id] - Update user (admin only)
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
    const { name, email, password } = body;

    // Check if target user exists
    const [targetUser] = await db.select().from(users).where(eq(users.id, id));

    if (!targetUser) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Prevent modifying admin user
    if (targetUser.role === "admin" && id !== user.id) {
      return NextResponse.json(
        { error: "Админ хэрэглэгчийг засах боломжгүй" },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData: Partial<typeof users.$inferInsert> = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (password) updateData.password = password; // In production, hash this

    // Update user
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Мэдээлэл амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Мэдээлэл шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user (admin only, cannot delete self or other admins)
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

    // Check if target user exists
    const [targetUser] = await db.select().from(users).where(eq(users.id, id));

    if (!targetUser) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Prevent deleting self
    if (targetUser.id === user.id) {
      return NextResponse.json(
        { error: "Өөрийгөө устгах боломжгүй" },
        { status: 400 }
      );
    }

    // Prevent deleting admin users
    if (targetUser.role === "admin") {
      return NextResponse.json(
        { error: "Админ хэрэглэгчийг устгах боломжгүй" },
        { status: 403 }
      );
    }

    // Delete user
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json({
      success: true,
      message: "Хэрэглэгч амжилттай устгагдлаа",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Хэрэглэгч устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}