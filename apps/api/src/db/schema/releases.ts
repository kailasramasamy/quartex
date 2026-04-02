import {
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"
import { testPrograms } from "./test-programs.js"
import { adminUsers } from "./admin-users.js"

export const releases = quartexSchema.table(
  "releases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    programId: uuid("program_id")
      .notNull()
      .references(() => testPrograms.id, { onDelete: "cascade" }),
    version: varchar("version", { length: 50 }).notNull(),
    platform: varchar("platform", { length: 20 }).notNull(),
    releaseNotes: text("release_notes").notNull(),
    downloadLink: text("download_link"),
    isNotified: boolean("is_notified").notNull().default(false),
    createdBy: uuid("created_by").references(() => adminUsers.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("releases_program_id_idx").on(t.programId),
    unique("releases_program_version_platform_unique").on(t.programId, t.version, t.platform),
  ],
)

export type Release = typeof releases.$inferSelect
export type NewRelease = typeof releases.$inferInsert
