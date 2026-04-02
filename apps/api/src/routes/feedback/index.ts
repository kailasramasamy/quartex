import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { feedback, feedbackAttachments, programTesters, testers } from "../../db/schema/index.js"
import { eq, and, desc } from "drizzle-orm"
import { authenticate } from "../../middleware/auth.js"
import { notFound, badRequest } from "../../lib/errors.js"
import { paginate, paginatedResponse } from "../../lib/pagination.js"
import { updateFeedbackSchema } from "@quartex/shared"
import type { FastifyRequest } from "fastify"

type IdParams = { Params: { id: string } }
type ProgramParams = { Params: { programId: string } }

async function listByProgram(request: FastifyRequest<ProgramParams>) {
  const { programId } = request.params
  const { category, status, priority, page, limit } = request.query as Record<string, string>
  const { offset, limit: lim } = paginate({ page, limit })

  const conditions = [eq(feedback.programId, programId)]
  if (category) conditions.push(eq(feedback.category, category))
  if (status) conditions.push(eq(feedback.status, status))
  if (priority) conditions.push(eq(feedback.priority, priority))

  const rows = await db
    .select({
      feedback,
      testerName: testers.name,
      testerEmail: testers.email,
    })
    .from(feedback)
    .innerJoin(testers, eq(testers.id, feedback.testerId))
    .where(and(...conditions))
    .orderBy(desc(feedback.createdAt))
    .limit(lim)
    .offset(offset)

  const total = await db.$count(feedback, and(...conditions))

  return paginatedResponse({ data: rows, total, page: Number(page ?? 1), limit: lim })
}

export default async function feedbackRoutes(app: FastifyInstance): Promise<void> {
  app.get<ProgramParams>(
    "/by-program/:programId",
    { preHandler: [authenticate] },
    async (request, reply) => reply.send(await listByProgram(request)),
  )

  app.get<IdParams>("/:id", { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params

    const [row] = await db
      .select({ feedback, tester: testers })
      .from(feedback)
      .innerJoin(testers, eq(testers.id, feedback.testerId))
      .where(eq(feedback.id, id))
      .limit(1)

    if (!row) throw notFound("Feedback not found")

    const attachments = await db
      .select()
      .from(feedbackAttachments)
      .where(eq(feedbackAttachments.feedbackId, id))

    return reply.send({ feedback: row.feedback, tester: row.tester, attachments })
  })

  app.put<IdParams>("/:id", { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params
    const parsed = updateFeedbackSchema.safeParse(request.body)
    if (!parsed.success) throw badRequest("Invalid request body")

    const updates: Partial<typeof feedback.$inferInsert> = {
      ...parsed.data,
      updatedAt: new Date(),
    }

    if (parsed.data.status === "resolved") {
      updates.resolvedAt = new Date()
    }

    const [updated] = await db
      .update(feedback)
      .set(updates)
      .where(eq(feedback.id, id))
      .returning()

    if (!updated) throw notFound("Feedback not found")

    return reply.send({ feedback: updated })
  })

  app.post("/submit", {
    config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
  }, async (request, reply) => {
    const body = request.body as {
      programId: string
      testerEmail: string
      category: string
      priority: string
      title: string
      description: string
      stepsToReproduce?: string
      deviceInfo?: string
      appVersion?: string
    }

    const [tester] = await db
      .select()
      .from(testers)
      .where(eq(testers.email, body.testerEmail))
      .limit(1)

    if (!tester) throw badRequest("Tester not found")

    const [enrollment] = await db
      .select()
      .from(programTesters)
      .where(
        and(
          eq(programTesters.programId, body.programId),
          eq(programTesters.testerId, tester.id),
          eq(programTesters.status, "active"),
        ),
      )
      .limit(1)

    if (!enrollment) throw badRequest("Tester is not active in this program")

    const [created] = await db
      .insert(feedback)
      .values({
        programId: body.programId,
        testerId: tester.id,
        category: body.category,
        priority: body.priority,
        title: body.title,
        description: body.description,
        stepsToReproduce: body.stepsToReproduce,
        deviceInfo: body.deviceInfo,
        appVersion: body.appVersion,
      })
      .returning({ id: feedback.id })

    return reply.code(201).send({ success: true, feedbackId: created.id })
  })

  app.post<IdParams>("/:id/attachments", async (request, reply) => {
    const { id } = request.params
    const body = request.body as {
      fileUrl: string
      fileType: string
      fileName?: string
      fileSize?: number
    }

    if (!body.fileUrl || !body.fileType) throw badRequest("fileUrl and fileType are required")

    const [existing] = await db
      .select({ id: feedback.id })
      .from(feedback)
      .where(eq(feedback.id, id))
      .limit(1)

    if (!existing) throw notFound("Feedback not found")

    const [attachment] = await db
      .insert(feedbackAttachments)
      .values({
        feedbackId: id,
        fileUrl: body.fileUrl,
        fileType: body.fileType,
        fileName: body.fileName,
        fileSize: body.fileSize,
      })
      .returning()

    return reply.code(201).send({ attachment })
  })
}
