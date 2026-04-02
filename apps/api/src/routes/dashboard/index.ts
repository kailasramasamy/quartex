import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { testPrograms, programTesters, testers, feedback, releases } from "../../db/schema/index.js"
import { eq, count, sql, desc } from "drizzle-orm"
import { authenticate } from "../../middleware/auth.js"

interface ActivityItem {
  type: string
  message: string
  timestamp: Date | null
  programId: string | null
  programName: string | null
  testerId: string | null
  testerName: string | null
  feedbackId: string | null
  releaseId: string | null
}

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

async function getRecentEnrollments(): Promise<ActivityItem[]> {
  const rows = await db
    .select({
      testerName: testers.name,
      testerId: testers.id,
      programId: programTesters.programId,
      programName: testPrograms.appName,
      registeredAt: programTesters.registeredAt,
    })
    .from(programTesters)
    .innerJoin(testers, eq(testers.id, programTesters.testerId))
    .innerJoin(testPrograms, eq(testPrograms.id, programTesters.programId))
    .orderBy(desc(programTesters.registeredAt))
    .limit(20)

  return rows.map((e) => ({
    type: "tester_registered",
    message: `${e.testerName} joined ${e.programName}`,
    timestamp: e.registeredAt,
    programId: e.programId,
    programName: e.programName,
    testerId: e.testerId,
    testerName: e.testerName,
    feedbackId: null,
    releaseId: null,
  }))
}

async function getRecentFeedback(): Promise<ActivityItem[]> {
  const rows = await db
    .select({
      feedbackId: feedback.id,
      title: feedback.title,
      category: feedback.category,
      testerName: testers.name,
      testerId: testers.id,
      programId: feedback.programId,
      programName: testPrograms.appName,
      createdAt: feedback.createdAt,
    })
    .from(feedback)
    .innerJoin(testers, eq(testers.id, feedback.testerId))
    .innerJoin(testPrograms, eq(testPrograms.id, feedback.programId))
    .orderBy(desc(feedback.createdAt))
    .limit(20)

  return rows.map((f) => ({
    type: "feedback_submitted",
    message: `${f.testerName} reported "${f.title}" in ${f.programName}`,
    timestamp: f.createdAt,
    programId: f.programId,
    programName: f.programName,
    testerId: f.testerId,
    testerName: f.testerName,
    feedbackId: f.feedbackId,
    releaseId: null,
  }))
}

async function getRecentReleases(): Promise<ActivityItem[]> {
  const rows = await db
    .select({
      releaseId: releases.id,
      version: releases.version,
      platform: releases.platform,
      programId: releases.programId,
      programName: testPrograms.appName,
      createdAt: releases.createdAt,
    })
    .from(releases)
    .innerJoin(testPrograms, eq(testPrograms.id, releases.programId))
    .orderBy(desc(releases.createdAt))
    .limit(20)

  return rows.map((r) => ({
    type: "release_created",
    message: `v${r.version} (${r.platform}) released for ${r.programName}`,
    timestamp: r.createdAt,
    programId: r.programId,
    programName: r.programName,
    testerId: null,
    testerName: null,
    feedbackId: null,
    releaseId: r.releaseId,
  }))
}

async function getRecentActivity(): Promise<ActivityItem[]> {
  const [enrollments, feedbackItems, releaseItems] = await Promise.all([
    getRecentEnrollments(),
    getRecentFeedback(),
    getRecentReleases(),
  ])

  return [...enrollments, ...feedbackItems, ...releaseItems]
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
