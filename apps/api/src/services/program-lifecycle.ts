import { db } from "../db/index.js"
import { testPrograms, programTesters, testers } from "../db/schema/index.js"
import { eq, and } from "drizzle-orm"
import { sendEmail } from "./email.js"
import { completionThanks } from "./email-templates.js"

export async function completeProgram(programId: string): Promise<number> {
  await db
    .update(testPrograms)
    .set({ status: "completed", updatedAt: new Date() })
    .where(eq(testPrograms.id, programId))

  const completed = await db
    .update(programTesters)
    .set({ status: "completed", completedAt: new Date() })
    .where(
      and(
        eq(programTesters.programId, programId),
        eq(programTesters.status, "active"),
      ),
    )
    .returning({ testerId: programTesters.testerId })

  await queueCompletionEmails(programId, completed.map((r) => r.testerId))

  return completed.length
}

async function queueCompletionEmails(
  programId: string,
  testerIds: string[],
): Promise<void> {
  if (testerIds.length === 0) return

  const programRows = await db
    .select({ appName: testPrograms.appName, rewardDescription: testPrograms.rewardDescription })
    .from(testPrograms)
    .where(eq(testPrograms.id, programId))
    .limit(1)

  const program = programRows[0]
  if (!program) return

  for (const testerId of testerIds) {
    const testerRows = await db
      .select({ name: testers.name, email: testers.email })
      .from(testers)
      .where(eq(testers.id, testerId))
      .limit(1)

    const tester = testerRows[0]
    if (!tester) continue

    const templateData = completionThanks({
      testerName: tester.name,
      appName: program.appName,
      rewardDescription: program.rewardDescription,
    })
    await sendEmail({
      to: tester.email,
      subject: templateData.subject,
      html: templateData.html,
      programId,
      testerId,
      template: "completion_thanks",
    })
  }
}

export async function activateProgram(
  programId: string,
  program: { testDurationDays: number },
): Promise<number> {
  const now = new Date()
  const endDate = new Date(now)
  endDate.setDate(endDate.getDate() + program.testDurationDays)

  await db
    .update(testPrograms)
    .set({ status: "in_progress", startDate: now, endDate, updatedAt: now })
    .where(eq(testPrograms.id, programId))

  const activated = await db
    .update(programTesters)
    .set({ status: "active", activatedAt: now })
    .where(
      and(
        eq(programTesters.programId, programId),
        eq(programTesters.status, "registered"),
      ),
    )
    .returning({ id: programTesters.id })

  return activated.length
}
