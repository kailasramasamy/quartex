import { Table } from "~/components/ui/table"
import type { Column } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import {
  FEEDBACK_CATEGORY,
  FEEDBACK_PRIORITY,
  FEEDBACK_STATUS,
} from "@quartex/shared"
import type { Feedback } from "@quartex/shared"

interface FeedbackTableProps {
  feedbackItems: Feedback[]
  onRowClick?: (id: string) => void
}

const columns: Column<Record<string, unknown>>[] = [
  { key: "title", header: "Title" },
  {
    key: "category",
    header: "Category",
    render: (row) => {
      const cfg = FEEDBACK_CATEGORY[row.category as keyof typeof FEEDBACK_CATEGORY]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "priority",
    header: "Priority",
    render: (row) => {
      const cfg = FEEDBACK_PRIORITY[row.priority as keyof typeof FEEDBACK_PRIORITY]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "status",
    header: "Status",
    render: (row) => {
      const cfg = FEEDBACK_STATUS[row.status as keyof typeof FEEDBACK_STATUS]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "createdAt",
    header: "Date",
    render: (row) =>
      new Date(row.createdAt as string).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
]

function FeedbackTable({ feedbackItems, onRowClick }: FeedbackTableProps) {
  const data = feedbackItems as unknown as Record<string, unknown>[]

  return (
    <Table
      columns={columns}
      data={data}
      onRowClick={onRowClick ? (row) => onRowClick(row.id as string) : undefined}
    />
  )
}

export { FeedbackTable }
export type { FeedbackTableProps }
