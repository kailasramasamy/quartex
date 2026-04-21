import type {
  ProgramStatus,
  TesterStatus,
  FeedbackCategory,
  FeedbackPriority,
  FeedbackStatus,
  Platform,
} from "../types/beta-testing.js"

interface StatusConfig {
  label: string
  color: string
}

export const PROGRAM_STATUS: Record<ProgramStatus, StatusConfig> = {
  draft: { label: "Draft", color: "#6B7280" },
  open: { label: "Open", color: "#3B82F6" },
  in_progress: { label: "In Progress", color: "#F59E0B" },
  completed: { label: "Completed", color: "#10B981" },
  cancelled: { label: "Cancelled", color: "#EF4444" },
}

export const TESTER_STATUS: Record<TesterStatus, StatusConfig> = {
  registered: { label: "Registered", color: "#3B82F6" },
  active: { label: "Active", color: "#10B981" },
  completed: { label: "Completed", color: "#8B5CF6" },
  rewarded: { label: "Rewarded", color: "#F59E0B" },
  dropped: { label: "Dropped", color: "#EF4444" },
}

export const FEEDBACK_CATEGORY: Record<FeedbackCategory, StatusConfig> = {
  bug: { label: "Bug", color: "#EF4444" },
  crash: { label: "Crash", color: "#DC2626" },
  ui_issue: { label: "UI Issue", color: "#F59E0B" },
  suggestion: { label: "Suggestion", color: "#3B82F6" },
  general: { label: "General", color: "#6B7280" },
}

export const FEEDBACK_PRIORITY: Record<FeedbackPriority, StatusConfig> = {
  critical: { label: "Critical", color: "#DC2626" },
  high: { label: "High", color: "#EF4444" },
  medium: { label: "Medium", color: "#F59E0B" },
  low: { label: "Low", color: "#6B7280" },
}

export const FEEDBACK_STATUS: Record<FeedbackStatus, StatusConfig> = {
  open: { label: "Open", color: "#3B82F6" },
  acknowledged: { label: "Acknowledged", color: "#8B5CF6" },
  in_progress: { label: "In Progress", color: "#F59E0B" },
  resolved: { label: "Resolved", color: "#10B981" },
  wont_fix: { label: "Won't Fix", color: "#6B7280" },
}

export const PLATFORM: Record<Platform, StatusConfig> = {
  android: { label: "Android", color: "#3DDC84" },
  ios: { label: "iOS", color: "#007AFF" },
  web: { label: "Web", color: "#F59E0B" },
}

export const QUARTEX_APPS = [
  { id: "martly", name: "Martly", color: "#10B981" },
  { id: "runq", name: "runQ", color: "#6366F1" },
  { id: "renewd", name: "Renewd", color: "#8B5CF6" },
] as const

export const DEFAULT_INVITE_MESSAGE = `You're invited to beta test {{appName}}!

We're looking for {{maxTesters}} testers to help us improve {{appName}} over the next {{testDurationDays}} days.

Platform: {{platforms}}
Reward: {{rewardDescription}}

Sign up here: {{inviteLink}}

Your feedback will directly shape the product. Thanks for being part of the journey!`
