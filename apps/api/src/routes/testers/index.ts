import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { testPrograms, programTesters, testers } from "../../db/schema/index.js"
import { eq, and, count, ilike, or } from "drizzle-orm"
import { authenticate } from "../../middleware/auth.js"
import { notFound, badRequest } from "../../lib/errors.js"
import { paginate, paginatedResponse } from "../../lib/pagination.js"
import type { TesterStatus } from "@quartex/shared"

type IdParams = { Params: { id: string } }
type ProgramParams = { Params: { programId: string } }
type ProgramTesterParams = { Params: { programId: string; testerId: string } }

export default async function testerRoutes(app: FastifyInstance): Promise<void> {
  // Public: lookup tester by email (for feedback form verification)
  app.get("/lookup", {
    config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
  }, async (request, reply) => {
    const { email } = request.query as { email?: string }
    if (!email) throw badRequest("Email is required")

    const [tester] = await db
      .select({ name: testers.name })
      .from(testers)
      .where(eq(testers.email, email))
      .limit(1)

    if (!tester) throw notFound("Tester not found")
    return reply.send({ name: tester.name })
  })

  app.get("/", { preHandler: [authenticate] }, async (request, reply) => {
    const { search, page, limit } = request.query as Record<string, string>
    const { offset, limit: lim } = paginate({ page, limit })

    const where = search
      ? or(ilike(testers.name, `%${search}%`), ilike(testers.email, `%${search}%`))
      : undefined

    const rows = await db
      .select({
        id: testers.id,
        name: testers.name,
        email: testers.email,
        phone: testers.phone,
        createdAt: testers.createdAt,
        programCount: count(programTesters.id),
      })
      .from(testers)
      .leftJoin(programTesters, eq(programTesters.testerId, testers.id))
      .where(where)
      .groupBy(testers.id)
      .limit(lim)
      .offset(offset)

    const [{ total }] = await db
      .select({ total: count() })
      .from(testers)
      .where(where)

    return reply.send(
      paginatedResponse({ data: rows, total: Number(total), page: Number(page ?? 1), limit: lim }),
    )
  })

  app.get<IdParams>("/:id", { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params

    const [tester] = await db.select().from(testers).where(eq(testers.id, id)).limit(1)
    if (!tester) throw notFound("Tester not found")

    const enrollments = await db
      .select({
        enrollment: programTesters,
        program: testPrograms,
      })
      .from(programTesters)
      .innerJoin(testPrograms, eq(testPrograms.id, programTesters.programId))
      .where(eq(programTesters.testerId, id))

    return reply.send({ tester, enrollments })
  })

  app.get<ProgramParams>(
    "/by-program/:programId",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { programId } = request.params
      const { status, page, limit } = request.query as Record<string, string>
      const { offset, limit: lim } = paginate({ page, limit })

      const conditions = [eq(programTesters.programId, programId)]
      if (status) conditions.push(eq(programTesters.status, status))

      const rows = await db
        .select({ tester: testers, enrollment: programTesters })
        .from(programTesters)
        .innerJoin(testers, eq(testers.id, programTesters.testerId))
        .where(and(...conditions))
        .limit(lim)
        .offset(offset)

      const [{ total }] = await db
        .select({ total: count() })
        .from(programTesters)
        .where(and(...conditions))

      return reply.send(
        paginatedResponse({ data: rows, total: Number(total), page: Number(page ?? 1), limit: lim }),
      )
    },
  )

  app.put<ProgramTesterParams>(
    "/by-program/:programId/:testerId",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { programId, testerId } = request.params
      const body = request.body as { status: TesterStatus; notes?: string }

      if (!body.status) throw badRequest("status is required")

      const timestamps: Partial<{
        activatedAt: Date
        completedAt: Date
        rewardedAt: Date
      }> = {}

      if (body.status === "active") timestamps.activatedAt = new Date()
      else if (body.status === "completed") timestamps.completedAt = new Date()
      else if (body.status === "rewarded") timestamps.rewardedAt = new Date()

      const [updated] = await db
        .update(programTesters)
        .set({ status: body.status, notes: body.notes, ...timestamps })
        .where(
          and(eq(programTesters.programId, programId), eq(programTesters.testerId, testerId)),
        )
        .returning()

      if (!updated) throw notFound("Enrollment not found")

      return reply.send({ enrollment: updated })
    },
  )

  app.delete<ProgramTesterParams>(
    "/by-program/:programId/:testerId",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { programId, testerId } = request.params

      const [deleted] = await db
        .delete(programTesters)
        .where(
          and(eq(programTesters.programId, programId), eq(programTesters.testerId, testerId)),
        )
        .returning()

      if (!deleted) throw notFound("Enrollment not found")

      return reply.send({ success: true })
    },
  )
}
