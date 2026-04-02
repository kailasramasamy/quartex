import { useEffect, useState } from "react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import {
  FlaskConical,
  Users,
  MessageSquare,
  Activity,
  UserPlus,
  Bug,
  Rocket,
  ArrowRight,
} from "lucide-react"
import { StatCard } from "~/components/ui/stat-card"
import { Card } from "~/components/ui/card"
import { api } from "~/lib/api"

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
})

interface DashboardStats {
  totalPrograms: number
  activePrograms: number
  openPrograms: number
  totalTesters: number
  openFeedback: number
}

interface ActivityItem {
  type: string
  message: string
  timestamp: string
  programId: string | null
  programName: string | null
  testerId: string | null
  testerName: string | null
  feedbackId: string | null
  releaseId: string | null
}

const ACTIVITY_ICONS = {
  tester_registered: UserPlus,
  feedback_submitted: Bug,
  release_created: Rocket,
} as Record<string, typeof Activity>

const ACTIVITY_COLORS = {
  tester_registered: "#10B981",
  feedback_submitted: "#F59E0B",
  release_created: "#3B82F6",
} as Record<string, string>

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function getActivityLink(item: ActivityItem): string | null {
  if (item.type === "feedback_submitted" && item.feedbackId) {
    return `/feedback/${item.feedbackId}`
  }
  if (item.type === "tester_registered" && item.programId) {
    return `/programs/${item.programId}`
  }
  if (item.type === "release_created" && item.programId) {
    return `/programs/${item.programId}`
  }
  return null
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const navigate = useNavigate()
  const time = relativeTime(item.timestamp)
  const Icon = ACTIVITY_ICONS[item.type] ?? Activity
  const color = ACTIVITY_COLORS[item.type] ?? "#3B82F6"
  const link = getActivityLink(item)

  return (
    <div
      className={`flex items-start gap-3 py-3 border-b border-border last:border-0 ${link ? "cursor-pointer hover:bg-bg-secondary/50 -mx-4 px-4 rounded-lg transition-colors" : ""}`}
      onClick={link ? () => navigate({ to: link }) : undefined}
    >
      <span
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={14} style={{ color }} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">{item.message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-text-muted">{time}</span>
          {item.programName && (
            <span className="text-xs text-accent">
              {item.programName}
            </span>
          )}
        </div>
      </div>
      {link && <ArrowRight size={14} className="text-text-muted mt-1 flex-shrink-0" />}
    </div>
  )
}

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])

  useEffect(() => {
    api
      .get<{ stats: DashboardStats }>("/dashboard")
      .then((r) => setStats(r.stats))
      .catch(console.error)
    api
      .get<{ activity: ActivityItem[] }>("/dashboard/activity")
      .then((r) => setActivity(r.activity))
      .catch(console.error)
  }, [])

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Overview of your beta testing programs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link to="/programs">
          <StatCard
            title="Total Programs"
            value={stats?.totalPrograms ?? "—"}
            icon={FlaskConical}
          />
        </Link>
        <Link to="/programs">
          <StatCard
            title="Active Programs"
            value={stats?.activePrograms ?? "—"}
            icon={Activity}
          />
        </Link>
        <Link to="/testers">
          <StatCard
            title="Total Testers"
            value={stats?.totalTesters ?? "—"}
            icon={Users}
          />
        </Link>
        <Link to="/feedback">
          <StatCard
            title="Open Feedback"
            value={stats?.openFeedback ?? "—"}
            icon={MessageSquare}
          />
        </Link>
      </div>

      <Card>
        <h2 className="font-heading text-base font-semibold text-text-primary mb-4">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <p className="text-sm text-text-muted py-4 text-center">
            No recent activity.
          </p>
        ) : (
          <div>
            {activity.map((item, i) => (
              <ActivityRow key={`${item.type}-${i}`} item={item} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
