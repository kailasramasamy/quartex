import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { releases } from "../../db/schema/index.js"
import { eq, desc } from "drizzle-orm"
import { authenticate } from "../../middleware/auth.js"
import { notFound, badRequest } from "../../lib/errors.js"
import { createReleaseSchema } from "@quartex/shared"

type IdParams = { Params: { id: string } }
type ProgramParams = { Params: { programId: string } }

export default async function releaseRoutes(app: FastifyInstance): Promise<void> {
  app.get<ProgramParams>(
    "/by-program/:programId",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { programId } = request.params

      const rows = await db
        .select()
        .from(releases)
        .where(eq(releases.programId, programId))
        .orderBy(desc(releases.createdAt))

      return reply.send({ releases: rows })
    },
  )

  app.post<ProgramParams>(
    "/by-program/:programId",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { programId } = request.params
      const parsed = createReleaseSchema.safeParse(request.body)
      if (!parsed.success) throw badRequest("Invalid request body")

      const { notifyTesters, ...rest } = parsed.data

      const [created] = await db
        .insert(releases)
        .values({
          ...rest,
          programId,
          createdBy: request.user.id,
          isNotified: notifyTesters,
        })
        .returning()

      return reply.code(201).send({ release: created })
    },
  )

  app.put<IdParams>("/:id", { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params
    const body = request.body as Partial<{
      version: string
      releaseNotes: string
      downloadLink: string
    }>

    const [updated] = await db
      .update(releases)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(releases.id, id))
      .returning()

    if (!updated) throw notFound("Release not found")

    return reply.send({ release: updated })
  })

  app.post<IdParams>("/:id/notify", { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params

    const [updated] = await db
      .update(releases)
      .set({ isNotified: true, updatedAt: new Date() })
      .where(eq(releases.id, id))
      .returning()

    if (!updated) throw notFound("Release not found")

    return reply.send({ success: true })
  })

  app.delete<IdParams>("/:id", { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params

    const [deleted] = await db.delete(releases).where(eq(releases.id, id)).returning()

    if (!deleted) throw notFound("Release not found")

    return reply.send({ success: true })
  })
}
