import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { Table } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { EmptyState } from "~/components/ui/empty-state"
import { api } from "~/lib/api"
import { TESTER_STATUS, PLATFORM } from "@quartex/shared"
import type { ProgramTester, TesterStatus } from "@quartex/shared"

interface TesterRow extends ProgramTester {
  name: string
  email: string
  phone: string
}

interface ProgramTestersTabProps {
  programId: string
  onCountChange: (count: number) => void
}

type TesterTableRow = Record<string, unknown> & TesterRow

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const columns = [
  {
    key: "name",
    header: "Name",
    render: (row: TesterTableRow) => (
      <span className="font-medium text-text-primary">{row.name}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (row: TesterTableRow) => (
      <span className="text-text-secondary">{row.email}</span>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (row: TesterTableRow) => (
      <span className="text-text-secondary">{row.phone}</span>
    ),
  },
  {
    key: "platform",
    header: "Platform",
    render: (row: TesterTableRow) => (
      <Badge label={PLATFORM[row.platform].label} color={PLATFORM[row.platform].color} size="sm" />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: TesterTableRow) => {
      const cfg = TESTER_STATUS[row.status as TesterStatus]
      return <Badge label={cfg.label} color={cfg.color} size="sm" />
    },
  },
  {
    key: "registeredAt",
    header: "Registered",
    render: (row: TesterTableRow) => (
      <span className="text-text-muted">{formatDate(row.registeredAt)}</span>
    ),
  },
]

function ProgramTestersTab({ programId, onCountChange }: ProgramTestersTabProps) {
  const [testers, setTesters] = useState<TesterRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    api
      .get<TesterRow[]>(`/testers/by-program/${programId}`)
      .then((data) => {
        setTesters(data)
        onCountChange(data.length)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [programId, onCountChange])

  if (isLoading) {
    return <p className="text-sm text-text-muted text-center py-8">Loading testers...</p>
  }

  if (testers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No testers yet"
        description="Testers will appear here after they register via the invite link."
      />
    )
  }

  return (
    <Table<TesterTableRow>
      columns={columns}
      data={testers as TesterTableRow[]}
    />
  )
}

export { ProgramTestersTab }
