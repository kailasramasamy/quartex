import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "~/components/ui/button"
import { StatusBadge } from "~/components/programs/status-badge"
import { api } from "~/lib/api"
import type { TestProgram, ProgramStatus } from "@quartex/shared"

interface ProgramOverviewProps {
  program: TestProgram
  testerCount: number
  feedbackCount: number
  releaseCount: number
  onStatusChange: (program: TestProgram) => void
  onEditClick: () => void
}

interface StatPill {
  label: string
  value: string | number
}

function StatPill({ label, value }: StatPill) {
  return (
    <div className="bg-bg-secondary rounded-lg px-4 py-3 flex flex-col gap-1">
      <p className="text-xs text-text-muted uppercase tracking-wide">{label}</p>
      <p className="font-heading text-xl font-semibold text-text-primary">{value}</p>
    </div>
  )
}

function daysRemaining(program: TestProgram): string {
  if (!program.endDate) return "—"
  const diff = new Date(program.endDate).getTime() - Date.now()
  const days = Math.ceil(diff / 86400000)
  return days > 0 ? `${days}d` : "Ended"
}

function nextAction(status: ProgramStatus): { label: string; next: ProgramStatus } | null {
  if (status === "draft") return { label: "Open Program", next: "open" }
  if (status === "open") return { label: "Start Testing", next: "in_progress" }
  if (status === "in_progress") return { label: "Complete", next: "completed" }
  return null
}

function InviteLinkRow({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}/join/${code}`

  const copy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <code className="flex-1 bg-bg-secondary rounded-lg px-3 py-2 text-xs text-text-secondary truncate border border-border">
        {link}
      </code>
      <Button variant="secondary" size="sm" onClick={copy}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}

function OverviewHeader({ program, action, isUpdating, onEditClick, onStatusUpdate }: {
  program: TestProgram
  action: ReturnType<typeof nextAction>
  isUpdating: boolean
  onEditClick: () => void
  onStatusUpdate: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-xl font-semibold text-text-primary">{program.appName}</h2>
          <StatusBadge status={program.status} />
        </div>
        {program.description && <p className="text-sm text-text-secondary max-w-prose">{program.description}</p>}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Button variant="secondary" size="sm" onClick={onEditClick}>Edit</Button>
        {action && (
          <Button size="sm" onClick={onStatusUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : action.label}
          </Button>
        )}
      </div>
    </div>
  )
}

function ProgramOverview({ program, testerCount, feedbackCount, releaseCount, onStatusChange, onEditClick }: ProgramOverviewProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const action = nextAction(program.status)

  const handleStatusUpdate = async () => {
    if (!action) return
    setIsUpdating(true)
    try {
      const updated = await api.put<TestProgram>(`/programs/${program.id}`, { status: action.next })
      onStatusChange(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <OverviewHeader program={program} action={action} isUpdating={isUpdating} onEditClick={onEditClick} onStatusUpdate={handleStatusUpdate} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatPill label="Testers" value={testerCount} />
        <StatPill label="Feedback" value={feedbackCount} />
        <StatPill label="Releases" value={releaseCount} />
        <StatPill label="Days Remaining" value={daysRemaining(program)} />
      </div>
      <div>
        <p className="text-sm font-medium text-text-secondary">Invite Link</p>
        <InviteLinkRow code={program.inviteCode} />
      </div>
    </div>
  )
}

export { ProgramOverview }
