import type { FastifyInstance } from "fastify"
import argon2 from "argon2"
import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { adminUsers } from "../../db/schema/index.js"
import { loginSchema } from "@quartex/shared"
import { authenticate } from "../../middleware/auth.js"
import { unauthorized, notFound } from "../../lib/errors.js"

export default async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post("/login", {
    config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
  }, async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invalid request body" })
    }

    const { email, password } = parsed.data

    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1)

    if (!admin) {
      throw unauthorized("Invalid email or password")
    }

    const valid = await argon2.verify(admin.passwordHash, password)
    if (!valid) {
      throw unauthorized("Invalid email or password")
    }

    const token = fastify.jwt.sign({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })

    return reply.send({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  })

  fastify.get(
    "/me",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.user

      const [admin] = await db
        .select({
          id: adminUsers.id,
          email: adminUsers.email,
          name: adminUsers.name,
          role: adminUsers.role,
        })
        .from(adminUsers)
        .where(eq(adminUsers.id, id))
        .limit(1)

      if (!admin) {
        throw notFound("Admin not found")
      }

      return reply.send({ admin })
    },
  )
}
