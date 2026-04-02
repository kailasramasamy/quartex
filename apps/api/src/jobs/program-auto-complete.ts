import { db } from "../db/index.js"
import { testPrograms } from "../db/schema/index.js"
import { eq, and, lte, sql } from "drizzle-orm"
import { completeProgram } from "../services/program-lifecycle.js"

export async function runProgramAutoComplete(): Promise<void> {
  const expired = await db
    .select({ id: testPrograms.id, appName: testPrograms.appName })
    .from(testPrograms)
    .where(
      and(
        eq(testPrograms.status, "in_progress"),
        lte(testPrograms.endDate, sql`now()`),
      ),
    )

  if (expired.length === 0) {
    console.log("[program-auto-complete] No expired programs found")
    return
  }

  let completedCount = 0

  for (const program of expired) {
    const testersCompleted = await completeProgram(program.id)
    console.log(
      `[program-auto-complete] Completed program ${program.id} (${program.appName}), ${testersCompleted} testers`,
    )
    completedCount++
  }

  console.log(
    `[program-auto-complete] Auto-completed ${completedCount} program(s)`,
  )
}
