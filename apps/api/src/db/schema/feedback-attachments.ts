import { uuid, varchar, text, integer, timestamp, index } from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"
import { feedback } from "./feedback.js"

export const feedbackAttachments = quartexSchema.table(
  "feedback_attachments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    feedbackId: uuid("feedback_id")
      .notNull()
      .references(() => feedback.id, { onDelete: "cascade" }),
    fileUrl: text("file_url").notNull(),
    fileType: varchar("file_type", { length: 20 }).notNull(),
    fileName: varchar("file_name", { length: 300 }),
    fileSize: integer("file_size"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("feedback_attachments_feedback_id_idx").on(t.feedbackId)],
)

export type FeedbackAttachment = typeof feedbackAttachments.$inferSelect
export type NewFeedbackAttachment = typeof feedbackAttachments.$inferInsert
