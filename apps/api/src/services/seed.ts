import argon2 from "argon2"
import { db } from "../db/index.js"
import { adminUsers } from "../db/schema/index.js"

const email = process.env.ADMIN_EMAIL ?? "admin@quartex.in"
const password = process.env.ADMIN_PASSWORD ?? "admin123"

const hash = await argon2.hash(password)

await db
  .insert(adminUsers)
  .values({
    email,
    passwordHash: hash,
    name: "Admin",
    role: "super_admin",
  })
  .onConflictDoUpdate({
    target: adminUsers.email,
    set: { passwordHash: hash, updatedAt: new Date() },
  })

console.log(`Admin user seeded: ${email}`)
process.exit(0)
