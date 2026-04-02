import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { env } from "../config/env.js"

const client = postgres(env.DATABASE_URL, { max: 1, onnotice: () => {} })
const db = drizzle(client)

async function createSchema(): Promise<void> {
  await client`CREATE SCHEMA IF NOT EXISTS quartex`
  await client`SET search_path TO quartex`
}

async function runMigrations(): Promise<void> {
  await migrate(db, { migrationsFolder: "./drizzle" })
}

async function main(): Promise<void> {
  console.log("Creating quartex schema if not exists...")
  await createSchema()

  console.log("Running migrations...")
  await runMigrations()

  console.log("Migrations complete.")
  await client.end()
}

main().catch((err: unknown) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
