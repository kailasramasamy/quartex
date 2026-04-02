import { retryFailedEmails } from "../services/email.js"

export async function runEmailRetry(): Promise<void> {
  const result = await retryFailedEmails()
  console.log(`[email-retry] Retry result:`, result)
}
