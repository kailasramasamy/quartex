import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { testPrograms, programTesters, feedback, releases } from "../../db/schema/index.js"
import { eq, and, count, sql, desc } from "drizzle-orm"
import { authenticate } from "../../middleware/auth.js"
import { notFound, badRequest, conflict } from "../../lib/errors.js"
import { paginate, paginatedResponse } from "../../lib/pagination.js"
import { generateInviteCode } from "../../services/invite-code.js"
import { createProgramSchema, updateProgramSchema } from "@quartex/shared"

type ProgramParams = { Params: { id: string } }

const EDITABLE_STATUSES = ["draft", "open"] as const
const preHandler = [authenticate]

async function getProgramOrThrow(id: string) {
  const [program] = await db
    .select()
    .from(testPrograms)
    .where(eq(testPrograms.id, id))
    .limit(1)
  if (!program) throw notFound("Program not found")
  return program
}

async function transitionStatus(
  id: string,
  from: string,
  to: string,
  extra: Record<string, unknown> = {},
) {
  const program = await getProgramOrThrow(id)
  if (program.status !== from) {
    throw badRequest(`Program must be '${from}' to perform this action`)
  }
  const [updated] = await db
    .update(testPrograms)
    .set({ status: to, updatedAt: new Date(), ...extra })
    .where(eq(testPrograms.id, id))
    .returning()
  return updated
}

export default async function programRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/", { preHandler }, async (request, reply) => {
    const query = request.query as { status?: string; page?: string; limit?: string }
    const { offset, limit } = paginate({ page: query.page, limit: query.limit })
    const page = Math.max(1, Number(query.page ?? 1))

    const testerCountSq = db
      .select({ programId: programTesters.programId, testerCnt: count().as("tester_cnt") })
      .from(programTesters)
      .groupBy(programTesters.programId)
      .as("tc")

    const feedbackCountSq = db
      .select({ programId: feedback.programId, feedbackCnt: count().as("feedback_cnt") })
      .from(feedback)
      .groupBy(feedback.programId)
      .as("fc")

    const where = query.status ? eq(testPrograms.status, query.status) : undefined

    const rows = await db
      .select({
        program: testPrograms,
        testerCount: sql<number>`coalesce(${testerCountSq.testerCnt}, 0)`,
        feedbackCount: sql<number>`coalesce(${feedbackCountSq.feedbackCnt}, 0)`,
      })
      .from(testPrograms)
      .leftJoin(testerCountSq, eq(testPrograms.id, testerCountSq.programId))
      .leftJoin(feedbackCountSq, eq(testPrograms.id, feedbackCountSq.programId))
      .where(where)
      .orderBy(desc(testPrograms.createdAt))
      .limit(limit)
      .offset(offset)

    const [{ total }] = await db
      .select({ total: count() })
      .from(testPrograms)
      .where(where)

    return reply.send(
      paginatedResponse({ data: rows, total: Number(total), page, limit }),
    )
  })

  fastify.post("/", { preHandler }, async (request, reply) => {
    const parsed = createProgramSchema.safeParse(request.body)
    if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Invalid body")

    const inviteCode = await generateInviteCode(parsed.data.appId)
    const [program] = await db
      .insert(testPrograms)
      .values({ ...parsed.data, inviteCode, createdBy: request.user.id })
      .returning()

    return reply.code(201).send({ program })
  })

  fastify.get("/:id", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])

    const program = await getProgramOrThrow(id)

    const [testerStats] = await db
      .select({ total: count() })
      .from(programTesters)
      .where(eq(programTesters.programId, id))

    const testersByStatus = await db
      .select({ status: programTesters.status, cnt: count() })
      .from(programTesters)
      .where(eq(programTesters.programId, id))
      .groupBy(programTesters.status)

    const [feedbackStats] = await db
      .select({ total: count() })
      .from(feedback)
      .where(eq(feedback.programId, id))

    const [releaseStats] = await db
      .select({ total: count() })
      .from(releases)
      .where(eq(releases.programId, id))

    return reply.send({
      program,
      stats: {
        totalTesters: Number(testerStats.total),
        testersByStatus: Object.fromEntries(
          testersByStatus.map((r) => [r.status, Number(r.cnt)]),
        ),
        totalFeedback: Number(feedbackStats.total),
        totalReleases: Number(releaseStats.total),
      },
    })
  })

  fastify.put("/:id", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])
    const program = await getProgramOrThrow(id)

    if (!EDITABLE_STATUSES.includes(program.status as "draft" | "open")) {
      throw conflict("Program can only be updated when in draft or open status")
    }

    const parsed = updateProgramSchema.safeParse(request.body)
    if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Invalid body")

    const [updated] = await db
      .update(testPrograms)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(testPrograms.id, id))
      .returning()

    return reply.send({ program: updated })
  })

  fastify.delete("/:id", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])
    const program = await getProgramOrThrow(id)

    if (!["draft", "cancelled"].includes(program.status)) {
      throw conflict("Program can only be deleted when in draft or cancelled status")
    }

    await db.delete(testPrograms).where(eq(testPrograms.id, id))
    return reply.send({ success: true })
  })

  fastify.post("/:id/open", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])
    const program = await transitionStatus(id, "draft", "open")
    return reply.send({ program })
  })

  fastify.post("/:id/start", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])
    const startDate = new Date()
    const program = await getProgramOrThrow(id)

    if (program.status !== "open") throw badRequest("Program must be 'open' to start")

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + program.testDurationDays)

    const [updated] = await db
      .update(testPrograms)
      .set({ status: "in_progress", startDate, endDate, updatedAt: new Date() })
      .where(eq(testPrograms.id, id))
      .returning()

    await db
      .update(programTesters)
      .set({ status: "active", activatedAt: new Date() })
      .where(and(eq(programTesters.programId, id), eq(programTesters.status, "registered")))

    return reply.send({ program: updated })
  })

  fastify.post("/:id/complete", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])
    const program = await transitionStatus(id, "in_progress", "completed")

    await db
      .update(programTesters)
      .set({ status: "completed", completedAt: new Date() })
      .where(and(eq(programTesters.programId, id), eq(programTesters.status, "active")))

    return reply.send({ program })
  })

  fastify.get("/:id/stats", { preHandler }, async (request, reply) => {
    const { id } = (request.params as ProgramParams["Params"])
    const program = await getProgramOrThrow(id)

    const [totalTesters] = await db
      .select({ cnt: count() })
      .from(programTesters)
      .where(eq(programTesters.programId, id))

    const [activeTesters] = await db
      .select({ cnt: count() })
      .from(programTesters)
      .where(and(eq(programTesters.programId, id), eq(programTesters.status, "active")))

    const feedbackByCategory = await db
      .select({ category: feedback.category, cnt: count() })
      .from(feedback)
      .where(eq(feedback.programId, id))
      .groupBy(feedback.category)

    const daysRemaining =
      program.endDate
        ? Math.max(0, Math.ceil((program.endDate.getTime() - Date.now()) / 86_400_000))
        : null

    return reply.send({
      totalTesters: Number(totalTesters.cnt),
      activeTesters: Number(activeTesters.cnt),
      feedbackByCategory: Object.fromEntries(
        feedbackByCategory.map((r) => [r.category, Number(r.cnt)]),
      ),
      daysRemaining,
    })
  })
}
