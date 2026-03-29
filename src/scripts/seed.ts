import * as dotenv from "dotenv";

// Load environment variables first
dotenv.config({ path: ".env.local" });

import { db } from "../db";
import { users, categories } from "../db/schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Seed users
    console.log("👤 Seeding users...");

    const existingAdmin = await db.select().from(users).where(eq(users.phone, "99999999"));

    if (existingAdmin.length === 0) {
      await db.insert(users).values([
        {
          id: "1",
          phone: "99999999", // Admin phone for login
          password: "yamaya2025", // In production, hash this!
          role: "admin",
          name: "Admin User",
          email: "admin@yamaya.mn",
        },
        {
          id: "2",
          phone: "88888888", // Manager phone for login
          password: "manager123", // In production, hash this!
          role: "manager",
          name: "Manager User",
          email: "manager@yamaya.mn",
        },
      ]);
      console.log("✅ Users seeded");
    } else {
      console.log("⏭️  Users already exist, skipping");
    }

    // Seed categories
    console.log("📁 Seeding categories...");

    // First, delete all existing categories
    await db.delete(categories);
    console.log("🗑️  Removed all existing categories");

    // Insert new categories
    await db.insert(categories).values([
      {
        id: "cat-1",
        name: "Амттан, чихэр",
        description: "Амттан, чихэр, зуушны бүтээгдэхүүн",
        icon: "�",
      },
      {
        id: "cat-2",
        name: "Ундаа, цай, кофе",
        description: "Ундаа, цай, кофены бүтээгдэхүүн",
        icon: "☕",
      },
      {
        id: "cat-3",
        name: "Амтлагч, соус",
        description: "Соус, амтлагч, ногооны тос",
        icon: "🍶",
      },
      {
        id: "cat-4",
        name: "Хүнсний бүтээгдэхүүн, хуурай хүнс",
        description: "Хуурай хүнс, гурил, будаа",
        icon: "🌾",
      },
      {
        id: "cat-5",
        name: "Бэлэн бүтээгдэхүүн, рамен",
        description: "Рамен, шөлтэй хоол, бэлэн хоол",
        icon: "🍜",
      },
      {
        id: "cat-6",
        name: "Мах, махан бүтээгдэхүүн",
        description: "Махан бүтээгдэхүүн, хиам",
        icon: "🥩",
      },
      {
        id: "cat-7",
        name: "Далайн бүтээгдэхүүн",
        description: "Загас, хавч, далайн бүтээгдэхүүн",
        icon: "🐟",
      },
      {
        id: "cat-8",
        name: "Хөлдөөсөн бүтээгдэхүүн",
        description: "Хөлдөөсөн хоол, мөсөн гэдэс",
        icon: "🧊",
      },
      {
        id: "cat-9",
        name: "Рестораны бүтээгдэхүүн",
        description: "Ресторан, зоогийн газруудад зориулсан",
        icon: "�",
      },
      {
        id: "cat-10",
        name: "Гэр ахуй",
        description: "Гэр ахуйн бүтээгдэхүүн, хэрэгсэл",
        icon: "🏠",
      },
    ]);
    console.log("✅ Categories seeded");

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  });
