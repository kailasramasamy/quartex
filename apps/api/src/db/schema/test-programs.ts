import {
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { quartexSchema } from "./admin-users.js"
import { adminUsers } from "./admin-users.js"

export const testPrograms = quartexSchema.table(
  "test_programs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    appId: varchar("app_id", { length: 50 }).notNull(),
    appName: varchar("app_name", { length: 100 }).notNull(),
    description: text("description"),
    status: varchar("status", { length: 20 }).notNull().default("draft"),
    platforms: text("platforms").array().notNull().default(["android"]),
    maxTesters: integer("max_testers").notNull().default(20),
    testDurationDays: integer("test_duration_days").notNull().default(14),
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),
    rewardDescription: text("reward_description").notNull().default("₹100 Amazon Gift Card"),
    rewardSent: boolean("reward_sent").notNull().default(false),
    inviteMessage: text("invite_message"),
    inviteCode: varchar("invite_code", { length: 20 }).notNull().unique(),
    androidTestLink: text("android_test_link"),
    iosTestLink: text("ios_test_link"),
    webTestLink: text("web_test_link"),
    createdBy: uuid("created_by").references(() => adminUsers.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("test_programs_status_idx").on(t.status),
    index("test_programs_app_id_idx").on(t.appId),
    uniqueIndex("test_programs_invite_code_idx").on(t.inviteCode),
  ],
)

export type TestProgram = typeof testPrograms.$inferSelect
export type NewTestProgram = typeof testPrograms.$inferInsert
