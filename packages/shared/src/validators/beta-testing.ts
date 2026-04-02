import { z } from "zod"

export const platformEnum = z.enum(["android", "ios", "web"])
export const programStatusEnum = z.enum([
  "draft", "open", "in_progress", "completed", "cancelled",
])
export const testerStatusEnum = z.enum([
  "registered", "active", "completed", "rewarded", "dropped",
])
export const feedbackCategoryEnum = z.enum([
  "bug", "crash", "ui_issue", "suggestion", "general",
])
export const feedbackPriorityEnum = z.enum([
  "critical", "high", "medium", "low",
])
export const feedbackStatusEnum = z.enum([
  "open", "acknowledged", "in_progress", "resolved", "wont_fix",
])

export const createProgramSchema = z.object({
  appId: z.string().min(1),
  appName: z.string().min(1).max(100),
  description: z.string().optional(),
  platforms: z.array(platformEnum).min(1),
  maxTesters: z.number().int().min(1).max(1000),
  testDurationDays: z.number().int().min(1).max(365),
  rewardDescription: z.string().min(1),
  inviteMessage: z.string().optional(),
  androidTestLink: z.string().url().optional().or(z.literal("")),
  iosTestLink: z.string().url().optional().or(z.literal("")),
  webTestLink: z.string().url().optional().or(z.literal("")),
})

export const updateProgramSchema = createProgramSchema.partial()

export const testerRegistrationSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(10).max(20),
  platform: platformEnum,
  deviceInfo: z.string().max(300).optional(),
})

export const submitFeedbackSchema = z.object({
  programId: z.string().uuid(),
  testerEmail: z.string().email(),
  category: feedbackCategoryEnum,
  priority: feedbackPriorityEnum.default("medium"),
  title: z.string().min(1).max(300),
  description: z.string().min(1),
  stepsToReproduce: z.string().optional(),
  deviceInfo: z.string().max(300).optional(),
  appVersion: z.string().max(50).optional(),
})

export const updateFeedbackSchema = z.object({
  status: feedbackStatusEnum.optional(),
  adminNotes: z.string().optional(),
  priority: feedbackPriorityEnum.optional(),
})

export const createReleaseSchema = z.object({
  version: z.string().min(1).max(50),
  platform: platformEnum,
  releaseNotes: z.string().min(1),
  downloadLink: z.string().url().optional().or(z.literal("")),
  notifyTesters: z.boolean().default(false),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
