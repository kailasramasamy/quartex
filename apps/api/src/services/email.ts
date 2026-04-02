import { db } from "../db/index.js"
import { emailLogs } from "../db/schema/index.js"
import { env } from "../config/env.js"
import { eq, and, or, lt, sql } from "drizzle-orm"
import nodemailer from "nodemailer"
import type { EmailTemplate } from "@quartex/shared"

export interface SendEmailOpts {
  to: string
  subject: string
  html: string
  template: EmailTemplate
  programId?: string
  testerId?: string
  metadata?: Record<string, unknown>
}

type Transporter = ReturnType<typeof nodemailer.createTransport>
let _transporter: Transporter | null | undefined = undefined

export function createTransporter(): Transporter | null {
  if (!env.SMTP_USER) return null
  return nodemailer.createTransport({
    host: env.SMTP_HOST ?? "smtp.zoho.in",
    port: env.SMTP_PORT,
    secure: true,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  })
}

function getTransporter(): Transporter | null {
  if (_transporter === undefined) _transporter = createTransporter()
  return _transporter
}

async function createLog(opts: SendEmailOpts): Promise<string> {
  const [log] = await db
    .insert(emailLogs)
    .values({
      recipientEmail: opts.to,
      template: opts.template,
      subject: opts.subject,
      status: "pending",
      programId: opts.programId,
      testerId: opts.testerId,
      metadata: opts.metadata ?? null,
    })
    .returning({ id: emailLogs.id })
  return log.id
}

async function markSent(logId: string): Promise<void> {
  await db
    .update(emailLogs)
    .set({ status: "sent", sentAt: new Date(), error: null })
    .where(eq(emailLogs.id, logId))
}

async function markFailed(logId: string, error: string): Promise<void> {
  await db
    .update(emailLogs)
    .set({ status: "failed", error: error.slice(0, 500) })
    .where(eq(emailLogs.id, logId))
}

async function dispatchEmail(
  transporter: Transporter,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  })
}

export async function sendEmail(opts: SendEmailOpts): Promise<void> {
  const logId = await createLog(opts)
  const transporter = getTransporter()

  if (!transporter) {
    console.warn(`[email] SMTP not configured — skipping send to ${opts.to}`)
    await markFailed(logId, "SMTP not configured")
    return
  }

  try {
    await dispatchEmail(transporter, opts.to, opts.subject, opts.html)
    await markSent(logId)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[email] Failed to send to ${opts.to}:`, message)
    await markFailed(logId, message)
  }
}

async function getRetryableLogs() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  return db
    .select()
    .from(emailLogs)
    .where(
      and(
        or(eq(emailLogs.status, "failed"), eq(emailLogs.status, "pending")),
        lt(emailLogs.createdAt, fiveMinutesAgo),
      ),
    )
    .limit(50)
}

async function retrySingleLog(
  transporter: Transporter,
  log: typeof emailLogs.$inferSelect,
): Promise<void> {
  const meta = log.metadata as Record<string, unknown> | null
  const html = typeof meta?.html === "string" ? meta.html : `<p>${log.subject}</p>`

  try {
    await dispatchEmail(transporter, log.recipientEmail, log.subject, html)
    await markSent(log.id)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await markFailed(log.id, message)
  }
}

export async function retryFailedEmails(): Promise<void> {
  const transporter = getTransporter()
  if (!transporter) {
    console.warn("[email] SMTP not configured — skipping retry")
    return
  }

  const logs = await getRetryableLogs()
  if (logs.length === 0) return

  console.log(`[email] Retrying ${logs.length} failed/pending email(s)`)
  await Promise.allSettled(logs.map((log) => retrySingleLog(transporter, log)))
}
