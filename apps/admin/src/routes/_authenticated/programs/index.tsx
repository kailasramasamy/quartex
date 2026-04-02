import { useEffect, useState } from "react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { Plus, FlaskConical } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Select } from "~/components/ui/select"
import { EmptyState } from "~/components/ui/empty-state"
import { ProgramTable } from "~/components/programs/program-table"
import { api } from "~/lib/api"
import type { TestProgram, ProgramStatus } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/programs/")({
  component: ProgramsPage,
})

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

function ProgramsPage() {
  const navigate = useNavigate()
  const [programs, setPrograms] = useState<TestProgram[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    api
      .get<TestProgram[]>("/programs")
      .then(setPrograms)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const filtered = statusFilter
    ? programs.filter((p) => p.status === (statusFilter as ProgramStatus))
    : programs

  const handleRowClick = (id: string) => {
    navigate({ to: "/programs/$id", params: { id } })
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-text-primary">Programs</h1>
        <Link to="/programs/new">
          <Button>
            <Plus size={16} />
            Create Program
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-48">
          <Select
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-text-muted text-center py-8">Loading programs...</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FlaskConical}
          title="No programs found"
          description={statusFilter ? "No programs match this status filter." : "Create your first beta testing program."}
          action={
            <Link to="/programs/new">
              <Button size="sm">
                <Plus size={14} /> Create Program
              </Button>
            </Link>
          }
        />
      ) : (
        <ProgramTable programs={filtered} onRowClick={handleRowClick} />
      )}
    </div>
  )
}
