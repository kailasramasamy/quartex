import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
          <Icon size={20} />
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="font-heading text-3xl font-semibold text-text-primary">
          {value}
        </p>
        {trend && (
          <p className="text-xs text-text-muted pb-1">{trend}</p>
        )}
      </div>
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
