import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __hemsInstitutePostgresqlPool?: Pool;
};

/**
 * Keep database initialization safe during Next.js build analysis.
 * DATABASE_URL is required when a request actually queries the database,
 * but should not be required merely to import a route module (for example
 * while Next.js collects metadata for /sitemap.xml).
 */
export const pool =
  globalForDb.__hemsInstitutePostgresqlPool ??
  new Pool(
    databaseUrl
      ? { connectionString: databaseUrl }
      : {
          // A local placeholder prevents pg from silently using environment
          // defaults. It does not open a connection until a query is made.
          connectionString: "postgresql://build:build@127.0.0.1:1/hemsinstitute_build",
        },
  );

if (process.env.NODE_ENV !== "production") {
  globalForDb.__hemsInstitutePostgresqlPool = pool;
}

export const db = drizzle(pool);
