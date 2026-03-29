import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

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

// POST /api/upload - Upload image to Vercel Blob
export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    return NextResponse.json(
      { error: "Зөвхөн админ болон менежер хэрэглэгч хандах боломжтой" },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Файл шаардлагатай" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Зөвхөн зураг файл оруулах боломжтой" },
        { status: 400 }¡
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Файлын хэмжээ 5MB-с хэтрэхгүй байх ёстой" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `products/${timestamp}-${file.name}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: "Зураг амжилттай хуулагдлаа",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Зураг хуулахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
s