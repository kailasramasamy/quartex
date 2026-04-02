export type QuartexAppId = "martly" | "runq" | "renewd"
export type AppId = QuartexAppId | (string & {})

export type Platform = "android" | "ios" | "web"

export type ProgramStatus =
  | "draft"
  | "open"
  | "in_progress"
  | "completed"
  | "cancelled"

export type TesterStatus =
  | "registered"
  | "active"
  | "completed"
  | "rewarded"
  | "dropped"

export type FeedbackCategory =
  | "bug"
  | "crash"
  | "ui_issue"
  | "suggestion"
  | "general"

export type FeedbackPriority = "critical" | "high" | "medium" | "low"

export type FeedbackStatus =
  | "open"
  | "acknowledged"
  | "in_progress"
  | "resolved"
  | "wont_fix"

export type EmailTemplate =
  | "registration_confirmation"
  | "testing_instructions"
  | "new_release"
  | "period_reminder"
  | "completion_thanks"
  | "reward_sent"

export interface TestProgram {
  id: string
  appId: string
  appName: string
  description: string | null
  status: ProgramStatus
  platforms: Platform[]
  maxTesters: number
  testDurationDays: number
  startDate: string | null
  endDate: string | null
  rewardDescription: string
  inviteMessage: string | null
  inviteCode: string
  androidTestLink: string | null
  iosTestLink: string | null
  webTestLink: string | null
  createdAt: string
  updatedAt: string
}

export interface Tester {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

export interface ProgramTester {
  id: string
  programId: string
  testerId: string
  platform: Platform
  deviceInfo: string | null
  status: TesterStatus
  registeredAt: string
  activatedAt: string | null
  completedAt: string | null
  rewardedAt: string | null
}

export interface Feedback {
  id: string
  programId: string
  testerId: string
  category: FeedbackCategory
  priority: FeedbackPriority
  title: string
  description: string
  stepsToReproduce: string | null
  deviceInfo: string | null
  appVersion: string | null
  status: FeedbackStatus
  adminNotes: string | null
  createdAt: string
}

export interface Release {
  id: string
  programId: string
  version: string
  platform: Platform
  releaseNotes: string
  downloadLink: string | null
  isNotified: boolean
  createdAt: string
}
