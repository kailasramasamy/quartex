import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "../config/env.js"
import * as schema from "./schema/index.js"

const client = postgres(env.DATABASE_URL, {
  onnotice: () => {},
})

await client`SET search_path TO quartex`

export const db = drizzle(client, { schema })
export { client }
