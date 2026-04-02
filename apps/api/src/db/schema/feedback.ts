import {
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"
import { testPrograms } from "./test-programs.js"
import { testers } from "./testers.js"

export const feedback = quartexSchema.table(
  "feedback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    programId: uuid("program_id")
      .notNull()
      .references(() => testPrograms.id, { onDelete: "cascade" }),
    testerId: uuid("tester_id")
      .notNull()
      .references(() => testers.id, { onDelete: "cascade" }),
    category: varchar("category", { length: 30 }).notNull().default("general"),
    priority: varchar("priority", { length: 20 }).notNull().default("medium"),
    title: varchar("title", { length: 300 }).notNull(),
    description: text("description").notNull(),
    stepsToReproduce: text("steps_to_reproduce"),
    deviceInfo: varchar("device_info", { length: 300 }),
    appVersion: varchar("app_version", { length: 50 }),
    status: varchar("status", { length: 20 }).notNull().default("open"),
    adminNotes: text("admin_notes"),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("feedback_program_id_idx").on(t.programId),
    index("feedback_tester_id_idx").on(t.testerId),
    index("feedback_category_idx").on(t.category),
    index("feedback_status_idx").on(t.status),
  ],
)

export type Feedback = typeof feedback.$inferSelect
export type NewFeedback = typeof feedback.$inferInsert
