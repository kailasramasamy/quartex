import type { FastifyInstance } from "fastify"
import { db } from "../../db/index.js"
import { testPrograms, programTesters, testers } from "../../db/schema/index.js"
import { eq, and, count } from "drizzle-orm"
import { notFound, badRequest, conflict } from "../../lib/errors.js"
import { testerRegistrationSchema } from "@quartex/shared"

type InviteParams = { Params: { code: string } }

async function getProgramByCode(code: string) {
  const [program] = await db
    .select()
    .from(testPrograms)
    .where(eq(testPrograms.inviteCode, code))
    .limit(1)
  return program ?? null
}

async function getTesterCount(programId: string): Promise<number> {
  const [row] = await db
    .select({ cnt: count() })
    .from(programTesters)
    .where(eq(programTesters.programId, programId))
  return Number(row.cnt)
}

async function upsertTester(
  name: string,
  email: string,
  phone: string,
): Promise<string> {
  const [existing] = await db
    .select({ id: testers.id })
    .from(testers)
    .where(eq(testers.email, email))
    .limit(1)

  if (existing) {
    await db
      .update(testers)
      .set({ name, phone, updatedAt: new Date() })
      .where(eq(testers.id, existing.id))
    return existing.id
  }

  const [created] = await db
    .insert(testers)
    .values({ name, email, phone })
    .returning({ id: testers.id })
  return created.id
}

async function activateProgramOnCapReached(
  programId: string,
  testDurationDays: number,
): Promise<void> {
  const startDate = new Date()
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + testDurationDays)

  await db
    .update(testPrograms)
    .set({ status: "in_progress", startDate, endDate, updatedAt: new Date() })
    .where(eq(testPrograms.id, programId))

  await db
    .update(programTesters)
    .set({ status: "active", activatedAt: new Date() })
    .where(and(eq(programTesters.programId, programId), eq(programTesters.status, "registered")))
}

export default async function inviteRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/:code", async (request, reply) => {
    const { code } = request.params as InviteParams["Params"]

    const program = await getProgramByCode(code)
    if (!program) throw notFound("Invite code not found")
    if (program.status !== "open") throw notFound("This program is not accepting registrations")

    const testerCount = await getTesterCount(program.id)
    const spotsRemaining = Math.max(0, program.maxTesters - testerCount)

    return reply.send({
      name: program.appName,
      description: program.description,
      platforms: program.platforms,
      reward: program.rewardDescription,
      spotsRemaining,
      testDurationDays: program.testDurationDays,
      inviteMessage: program.inviteMessage,
    })
  })

  fastify.post("/:code/register", async (request, reply) => {
    const { code } = request.params as InviteParams["Params"]

    const program = await getProgramByCode(code)
    if (!program) throw notFound("Invite code not found")
    if (program.status !== "open") throw badRequest("This program is not accepting registrations")

    const parsed = testerRegistrationSchema.safeParse(request.body)
    if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Invalid body")

    const { name, email, phone, platform, deviceInfo } = parsed.data

    if (!program.platforms.includes(platform)) {
      throw badRequest(`Platform '${platform}' is not supported by this program`)
    }

    const testerCount = await getTesterCount(program.id)
    if (testerCount >= program.maxTesters) {
      throw conflict("This program has reached its maximum tester capacity")
    }

    const testerId = await upsertTester(name, email, phone)

    const [existing] = await db
      .select({ id: programTesters.id })
      .from(programTesters)
      .where(and(eq(programTesters.programId, program.id), eq(programTesters.testerId, testerId)))
      .limit(1)

    if (existing) throw conflict("You are already registered for this program")

    await db
      .insert(programTesters)
      .values({ programId: program.id, testerId, platform, deviceInfo })

    const newCount = testerCount + 1
    if (newCount >= program.maxTesters) {
      await activateProgramOnCapReached(program.id, program.testDurationDays)
    }

    return reply.code(201).send({
      success: true,
      tester: { id: testerId, name },
      message: "Registration successful",
    })
  })
}
