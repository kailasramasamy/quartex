import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-bg-card border border-border text-text-muted">
        <Icon size={32} />
      </span>
      <div className="flex flex-col gap-1 max-w-xs">
        <h3 className="font-heading text-base font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateProps }
