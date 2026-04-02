import { db } from "../db/index.js"
import { testPrograms } from "../db/schema/index.js"
import { eq } from "drizzle-orm"

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

function randomCode(length: number): string {
  let code = ""
  for (let i = 0; i < length; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}

export async function generateInviteCode(appId: string): Promise<string> {
  const prefix = appId.slice(0, 4).toUpperCase()
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = `${prefix}-${randomCode(4)}`
    const existing = await db
      .select({ id: testPrograms.id })
      .from(testPrograms)
      .where(eq(testPrograms.inviteCode, code))
      .limit(1)

    if (existing.length === 0) return code
  }
  return `${prefix}-${randomCode(6)}`
}
