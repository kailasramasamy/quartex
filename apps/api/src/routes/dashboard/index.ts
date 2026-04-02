import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { testPrograms, programTesters, testers, feedback, releases } from "../../db/schema/index.js"
import { count, sql, desc } from "drizzle-orm"
import { authenticate } from "../../middleware/auth.js"

type ActivityItem = { type: string; message: string; timestamp: Date | null }

async function getOverallStats() {
  const [programStats] = await db
    .select({
      total: count(),
      active: sql<number>`count(*) filter (where ${testPrograms.status} = 'in_progress')`,
      open: sql<number>`count(*) filter (where ${testPrograms.status} = 'open')`,
      completed: sql<number>`count(*) filter (where ${testPrograms.status} = 'completed')`,
      draft: sql<number>`count(*) filter (where ${testPrograms.status} = 'draft')`,
    })
    .from(testPrograms)

  const [{ uniqueTesters }] = await db
    .select({ uniqueTesters: count() })
    .from(testers)

  const [feedbackStats] = await db
    .select({
      total: count(),
      open: sql<number>`count(*) filter (where ${feedback.status} = 'open')`,
      resolved: sql<number>`count(*) filter (where ${feedback.status} = 'resolved')`,
    })
    .from(feedback)

  return {
    totalPrograms: Number(programStats.total),
    activePrograms: Number(programStats.active),
    openPrograms: Number(programStats.open),
    completedPrograms: Number(programStats.completed),
    draftPrograms: Number(programStats.draft),
    totalTesters: Number(uniqueTesters),
    totalFeedback: Number(feedbackStats.total),
    openFeedback: Number(feedbackStats.open),
    resolvedFeedback: Number(feedbackStats.resolved),
  }
}

async function getRecentActivity(): Promise<ActivityItem[]> {
  const recentEnrollments = await db
    .select({
      name: testers.name,
      registeredAt: programTesters.registeredAt,
    })
    .from(programTesters)
    .innerJoin(testers, sql`${testers.id} = ${programTesters.testerId}`)
    .orderBy(desc(programTesters.registeredAt))
    .limit(20)

  const recentFeedback = await db
    .select({ title: feedback.title, createdAt: feedback.createdAt })
    .from(feedback)
    .orderBy(desc(feedback.createdAt))
    .limit(20)

  const recentReleases = await db
    .select({ version: releases.version, createdAt: releases.createdAt })
    .from(releases)
    .orderBy(desc(releases.createdAt))
    .limit(20)

  const items: ActivityItem[] = [
    ...recentEnrollments.map((e) => ({
      type: "tester_registered",
      message: `${e.name} registered as a tester`,
      timestamp: e.registeredAt,
    })),
    ...recentFeedback.map((f) => ({
      type: "feedback_submitted",
      message: `New feedback: ${f.title}`,
      timestamp: f.createdAt,
    })),
    ...recentReleases.map((r) => ({
      type: "release_created",
      message: `Release v${r.version} created`,
      timestamp: r.createdAt,
    })),
  ]

  return items
    .sort((a, b) => {
      const aTime = a.timestamp?.getTime() ?? 0
      const bTime = b.timestamp?.getTime() ?? 0
      return bTime - aTime
    })
    .slice(0, 20)
}

export default async function dashboardRoutes(app: FastifyInstance): Promise<void> {
  app.get("/", { preHandler: [authenticate] }, async (_request, reply) => {
    const stats = await getOverallStats()
    return reply.send({ stats })
  })

  app.get("/activity", { preHandler: [authenticate] }, async (_request, reply) => {
    const activity = await getRecentActivity()
    return reply.send({ activity })
  })
}
