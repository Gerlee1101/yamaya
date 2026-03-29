import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Get DATABASE_URL with fallback check
function getDatabaseUrl() {
  const url = process.env.DB_DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL must be set in environment variables");
  }
  return url;
}

// Create database connection lazily
let _db: ReturnType<typeof drizzle> | null = null;

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    if (!_db) {
      const sql = neon(getDatabaseUrl());
      _db = drizzle(sql, { schema });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_db as any)[prop];
  }
});
