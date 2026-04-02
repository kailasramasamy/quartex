import { useEffect, useState } from "react"
import { MessageSquare } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { Table } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { EmptyState } from "~/components/ui/empty-state"
import { api } from "~/lib/api"
import { FEEDBACK_CATEGORY, FEEDBACK_PRIORITY, FEEDBACK_STATUS } from "@quartex/shared"
import type { Feedback, FeedbackCategory, FeedbackPriority, FeedbackStatus } from "@quartex/shared"

interface ProgramFeedbackTabProps {
  programId: string
  onCountChange: (count: number) => void
}

type FeedbackRow = Record<string, unknown> & Feedback

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (row: FeedbackRow) => (
      <span className="font-medium text-text-primary">{row.title}</span>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (row: FeedbackRow) => {
      const cfg = FEEDBACK_CATEGORY[row.category as FeedbackCategory]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "priority",
    header: "Priority",
    render: (row: FeedbackRow) => {
      const cfg = FEEDBACK_PRIORITY[row.priority as FeedbackPriority]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "status",
    header: "Status",
    render: (row: FeedbackRow) => {
      const cfg = FEEDBACK_STATUS[row.status as FeedbackStatus]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "testerId",
    header: "Tester",
    render: (row: FeedbackRow) => (
      <span className="text-text-secondary font-mono text-xs">{row.testerId}</span>
    ),
  },
  {
    key: "createdAt",
    header: "Date",
    render: (row: FeedbackRow) => (
      <span className="text-text-muted">{formatDate(row.createdAt)}</span>
    ),
  },
]

function ProgramFeedbackTab({ programId, onCountChange }: ProgramFeedbackTabProps) {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    api
      .get<Feedback[]>(`/feedback/by-program/${programId}`)
      .then((data) => {
        setFeedback(data)
        onCountChange(data.length)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [programId, onCountChange])

  if (isLoading) {
    return <p className="text-sm text-text-muted text-center py-8">Loading feedback...</p>
  }

  if (feedback.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No feedback yet"
        description="Feedback submitted by testers will appear here."
      />
    )
  }

  return (
    <Table<FeedbackRow>
      columns={columns}
      data={feedback as FeedbackRow[]}
      onRowClick={(row) => navigate({ to: "/feedback/$id", params: { id: row.id } })}
    />
  )
}

export { ProgramFeedbackTab }
