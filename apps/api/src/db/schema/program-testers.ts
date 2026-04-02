import {
  uuid,
  varchar,
  text,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"
import { testPrograms } from "./test-programs.js"
import { testers } from "./testers.js"

export const programTesters = quartexSchema.table(
  "program_testers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    programId: uuid("program_id")
      .notNull()
      .references(() => testPrograms.id, { onDelete: "cascade" }),
    testerId: uuid("tester_id")
      .notNull()
      .references(() => testers.id, { onDelete: "cascade" }),
    platform: varchar("platform", { length: 20 }).notNull(),
    deviceInfo: varchar("device_info", { length: 300 }),
    status: varchar("status", { length: 20 }).notNull().default("registered"),
    registeredAt: timestamp("registered_at", { withTimezone: true }).defaultNow(),
    activatedAt: timestamp("activated_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    rewardedAt: timestamp("rewarded_at", { withTimezone: true }),
    notes: text("notes"),
  },
  (t) => [
    unique("program_testers_program_tester_unique").on(t.programId, t.testerId),
    index("program_testers_program_id_idx").on(t.programId),
    index("program_testers_tester_id_idx").on(t.testerId),
    index("program_testers_status_idx").on(t.status),
  ],
)

export type ProgramTester = typeof programTesters.$inferSelect
export type NewProgramTester = typeof programTesters.$inferInsert
