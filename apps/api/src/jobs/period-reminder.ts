import { db } from "../db/index.js"
import { testPrograms, programTesters, testers } from "../db/schema/index.js"
import { eq, and, sql } from "drizzle-orm"
import { sendEmail } from "../services/email.js"
import { periodReminder } from "../services/email-templates.js"
import { env } from "../config/env.js"

const REMINDER_DAYS = [1, 2] as const

export async function runPeriodReminder(): Promise<void> {
  const programs = await db
    .select({
      id: testPrograms.id,
      appName: testPrograms.appName,
      endDate: testPrograms.endDate,
    })
    .from(testPrograms)
    .where(eq(testPrograms.status, "in_progress"))

  let remindersSent = 0

  for (const program of programs) {
    if (!program.endDate) continue

    const daysRemaining = getDaysRemaining(program.endDate)
    if (!REMINDER_DAYS.includes(daysRemaining as 1 | 2)) continue

    remindersSent += await sendRemindersForProgram(
      program.id,
      program.appName,
      daysRemaining,
    )
  }

  console.log(`[period-reminder] Sent ${remindersSent} reminder(s)`)
}

function getDaysRemaining(endDate: Date): number {
  const now = Date.now()
  const end = endDate.getTime()
  return Math.round((end - now) / (1000 * 60 * 60 * 24))
}

async function sendRemindersForProgram(
  programId: string,
  appName: string,
  daysRemaining: number,
): Promise<number> {
  const activeTesterRows = await db
    .select({ name: testers.name, email: testers.email, testerId: testers.id })
    .from(programTesters)
    .innerJoin(testers, eq(programTesters.testerId, testers.id))
    .where(
      and(
        eq(programTesters.programId, programId),
        eq(programTesters.status, "active"),
      ),
    )

  const feedbackLink = `${env.INVITE_BASE_URL}/feedback/${programId}`

  for (const tester of activeTesterRows) {
    const template = periodReminder({ testerName: tester.name, appName, daysRemaining, feedbackLink })
    await sendEmail({
      to: tester.email,
      subject: template.subject,
      html: template.html,
      programId,
      testerId: tester.testerId,
      template: "period_reminder",
    })
  }

  return activeTesterRows.length
}
