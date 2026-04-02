import { Table } from "~/components/ui/table"
import type { Column } from "~/components/ui/table"
import type { Tester } from "@quartex/shared"

type TesterRow = Tester & { programCount?: number }

interface TesterTableProps {
  testers: TesterRow[]
  onRowClick?: (id: string) => void
}

const columns: Column<Record<string, unknown>>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  {
    key: "programCount",
    header: "Programs",
    render: (row) => String(row.programCount ?? 0),
  },
  {
    key: "createdAt",
    header: "Joined",
    render: (row) =>
      new Date(row.createdAt as string).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
]

function TesterTable({ testers, onRowClick }: TesterTableProps) {
  const data = testers as unknown as Record<string, unknown>[]

  return (
    <Table
      columns={columns}
      data={data}
      onRowClick={onRowClick ? (row) => onRowClick(row.id as string) : undefined}
    />
  )
}

export { TesterTable }
export type { TesterTableProps, TesterRow }
