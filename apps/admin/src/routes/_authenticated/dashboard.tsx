import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { FlaskConical, Activity, Users, MessageSquare } from "lucide-react"
import { StatCard } from "~/components/ui/stat-card"
import { Card } from "~/components/ui/card"
import { api } from "~/lib/api"

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
})

interface DashboardStats {
  totalPrograms: number
  activePrograms: number
  totalTesters: number
  openFeedback: number
}

interface ActivityItem {
  id: string
  type: string
  message: string
  timestamp: string
}

function useRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const time = useRelativeTime(item.timestamp)
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
        <Activity size={14} className="text-accent" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">{item.message}</p>
        <p className="text-xs text-text-muted mt-0.5">{time}</p>
      </div>
    </div>
  )
}

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])

  useEffect(() => {
    api.get<DashboardStats>("/dashboard").then(setStats).catch(console.error)
    api.get<ActivityItem[]>("/dashboard/activity").then(setActivity).catch(console.error)
  }, [])

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">Overview of your beta testing programs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Programs" value={stats?.totalPrograms ?? "—"} icon={FlaskConical} />
        <StatCard title="Active Programs" value={stats?.activePrograms ?? "—"} icon={Activity} />
        <StatCard title="Total Testers" value={stats?.totalTesters ?? "—"} icon={Users} />
        <StatCard title="Open Feedback" value={stats?.openFeedback ?? "—"} icon={MessageSquare} />
      </div>

      <Card>
        <h2 className="font-heading text-base font-semibold text-text-primary mb-4">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <p className="text-sm text-text-muted py-4 text-center">No recent activity.</p>
        ) : (
          <div>
            {activity.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
