import {
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"
import { testPrograms } from "./test-programs.js"
import { testers } from "./testers.js"

export const emailLogs = quartexSchema.table(
  "email_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    recipientEmail: varchar("recipient_email", { length: 320 }).notNull(),
    template: varchar("template", { length: 50 }).notNull(),
    subject: varchar("subject", { length: 300 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    programId: uuid("program_id").references(() => testPrograms.id),
    testerId: uuid("tester_id").references(() => testers.id),
    metadata: jsonb("metadata"),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    error: text("error"),
  },
  (t) => [
    index("email_logs_status_idx").on(t.status),
    index("email_logs_template_idx").on(t.template),
    index("email_logs_program_id_idx").on(t.programId),
  ],
)

export type EmailLog = typeof emailLogs.$inferSelect
export type NewEmailLog = typeof emailLogs.$inferInsert
