import { Table } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { StatusBadge } from "~/components/programs/status-badge"
import { PLATFORM } from "@quartex/shared"
import type { TestProgram } from "@quartex/shared"

interface ProgramTableProps {
  programs: TestProgram[]
  onRowClick: (id: string) => void
}

type ProgramRow = Record<string, unknown> & TestProgram

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function ProgramTable({ programs, onRowClick }: ProgramTableProps) {
  const columns = [
    {
      key: "appName",
      header: "App Name",
      render: (row: ProgramRow) => (
        <span className="font-medium text-text-primary">{row.appName}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: ProgramRow) => <StatusBadge status={row.status} />,
    },
    {
      key: "platforms",
      header: "Platforms",
      render: (row: ProgramRow) => (
        <div className="flex gap-1 flex-wrap">
          {row.platforms.map((p) => (
            <Badge key={p} label={PLATFORM[p].label} color={PLATFORM[p].color} size="sm" />
          ))}
        </div>
      ),
    },
    {
      key: "maxTesters",
      header: "Testers",
      render: (row: ProgramRow) => (
        <span className="text-text-secondary">{row.maxTesters}</span>
      ),
    },
    {
      key: "testDurationDays",
      header: "Duration",
      render: (row: ProgramRow) => (
        <span className="text-text-secondary">{row.testDurationDays}d</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row: ProgramRow) => (
        <span className="text-text-muted">{formatDate(row.createdAt)}</span>
      ),
    },
  ]

  return (
    <Table<ProgramRow>
      columns={columns}
      data={programs as ProgramRow[]}
      onRowClick={(row) => onRowClick(row.id)}
    />
  )
}

export { ProgramTable }
export type { ProgramTableProps }
