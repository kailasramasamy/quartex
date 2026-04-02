import { uuid, varchar, timestamp, index } from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"

export const testers = quartexSchema.table(
  "testers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("testers_email_idx").on(t.email),
    index("testers_phone_idx").on(t.phone),
  ],
)

export type Tester = typeof testers.$inferSelect
export type NewTester = typeof testers.$inferInsert
