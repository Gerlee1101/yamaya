import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

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

// GET /api/users - List all users (admin only)
export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Зөвхөн админ хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const allUsers = await db.select().from(users);

    // Return users without passwords
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);

    return NextResponse.json({
      success: true,
      users: usersWithoutPasswords,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Хэрэглэгчдийг авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user (admin only, can only create managers)
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
    const { phone, password, name, email } = body;

    // Validation
    if (!phone || !password || !name) {
      return NextResponse.json(
        { error: "Утасны дугаар, нууц үг болон нэр шаардлагатай" },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));

    if (existing) {
      return NextResponse.json(
        { error: "Энэ утасны дугаар аль хэдийн бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // Generate ID
    const id = `user-${Date.now()}`;

    // Create new manager
    const [newUser] = await db
      .insert(users)
      .values({
        id,
        phone,
        password, // In production, hash this
        role: "manager",
        name,
        email: email || null,
      })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Менежер амжилттай үүсгэгдлээ",
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Хэрэглэгч үүсгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
