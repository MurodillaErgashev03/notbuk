import "dotenv/config";
import { defineConfig } from "prisma/config";

// Migrations run against the SESSION pooler (DIRECT_URL) — the transaction
// pooler used at runtime (DATABASE_URL) can't run DDL / prepared statements.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
