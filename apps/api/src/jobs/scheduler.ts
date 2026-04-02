import cron from "node-cron"
import { runProgramAutoComplete } from "./program-auto-complete.js"
import { runPeriodReminder } from "./period-reminder.js"
import { runEmailRetry } from "./email-retry.js"

type JobDefinition = {
  name: string
  schedule: string
  handler: () => Promise<void>
  options?: cron.ScheduleOptions
}

const jobs: JobDefinition[] = [
  {
    name: "program-auto-complete",
    schedule: "0 * * * *",
    handler: runProgramAutoComplete,
  },
  {
    name: "period-reminder",
    schedule: "0 9 * * *",
    handler: runPeriodReminder,
    options: { timezone: "Asia/Kolkata" },
  },
  {
    name: "email-retry",
    schedule: "*/15 * * * *",
    handler: runEmailRetry,
  },
]

function wrapWithErrorHandler(name: string, handler: () => Promise<void>) {
  return async () => {
    try {
      await handler()
    } catch (err) {
      console.error(`[scheduler] Job "${name}" failed:`, err)
    }
  }
}

export function startScheduler(): void {
  for (const job of jobs) {
    cron.schedule(job.schedule, wrapWithErrorHandler(job.name, job.handler), job.options)
  }

  const jobNames = jobs.map((j) => `${j.name} (${j.schedule})`).join(", ")
  console.log(`[scheduler] Scheduler started. Jobs: ${jobNames}`)
}
