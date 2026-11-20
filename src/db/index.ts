import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __hemsInstitutePostgresqlPool?: Pool;
};

/**
 * Vercel Serverless + Supabase:
 * - Keep one connection per warm function instance to avoid exhausting the
 *   Supabase Session Pooler's small per-project client limit.
 * - Prefer Supabase Transaction Pooler (port 6543) for production/serverless.
 * - Reuse the pool on warm invocations and release idle sockets quickly.
 *
 * DATABASE_URL is required when a request actually queries the database,
 * but should not be required merely to import a route module during build.
 */
const poolOptions = databaseUrl
  ? {
      connectionString: databaseUrl,
      max: 1,
      min: 0,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
      maxUses: 7_500,
      allowExitOnIdle: true,
      keepAlive: true,
    }
  : {
      // Build-time placeholder only; it is never a valid runtime database.
      connectionString: "postgresql://build:build@127.0.0.1:1/hemsinstitute_build",
      max: 1,
      min: 0,
      idleTimeoutMillis: 1_000,
      connectionTimeoutMillis: 1_000,
      allowExitOnIdle: true,
    };

export const pool =
  globalForDb.__hemsInstitutePostgresqlPool ?? new Pool(poolOptions);

if (process.env.NODE_ENV !== "production") {
  globalForDb.__hemsInstitutePostgresqlPool = pool;
}

export const db = drizzle(pool);
