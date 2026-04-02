import { useState, useEffect, useMemo } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { MessageSquare } from "lucide-react"
import { api } from "~/lib/api"
import { Select } from "~/components/ui/select"
import { EmptyState } from "~/components/ui/empty-state"
import { FeedbackTable } from "~/components/feedback/feedback-table"
import { FeedbackFilters } from "~/components/feedback/feedback-filters"
import type { FeedbackFilterValues } from "~/components/feedback/feedback-filters"
import type { Feedback, TestProgram } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/feedback/")({
  component: FeedbackPage,
})

function useProgramList() {
  const [programs, setPrograms] = useState<TestProgram[]>([])
  useEffect(() => {
    api
      .get<{ data: Array<{ program: TestProgram }>; pagination: unknown }>("/programs?page=1&limit=100")
      .then((r) => setPrograms(r.data.map((d) => d.program)))
      .catch(() => {})
  }, [])
  return programs
}

function applyFilters(items: Feedback[], filters: FeedbackFilterValues): Feedback[] {
  return items.filter((f) => {
    if (filters.category && f.category !== filters.category) return false
    if (filters.priority && f.priority !== filters.priority) return false
    if (filters.status && f.status !== filters.status) return false
    return true
  })
}

function FeedbackPage() {
  const navigate = useNavigate()
  const programs = useProgramList()
  const [selectedProgramId, setSelectedProgramId] = useState("")
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [filters, setFilters] = useState<FeedbackFilterValues>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const url = selectedProgramId
      ? `/feedback/by-program/${selectedProgramId}`
      : "/feedback"

    api
      .get<{ data: Array<{ feedback: Feedback; programName?: string }>; pagination: unknown }>(url)
      .then((r) => setFeedback(r.data.map((d) => d.feedback)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [selectedProgramId])

  const filtered = useMemo(() => applyFilters(feedback, filters), [feedback, filters])

  const programOptions = [
    { value: "", label: "All Programs" },
    ...programs.map((p) => ({ value: p.id, label: p.appName })),
  ]

  return (
    <div className="p-8 flex flex-col gap-6">
      <h2 className="font-heading text-2xl font-semibold text-text-primary">Feedback</h2>

      <div className="flex flex-wrap items-end gap-4">
        <Select
          label="Program"
          options={programOptions}
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
          className="w-56"
        />
        <FeedbackFilters onFilterChange={setFilters} current={filters} />
      </div>

      {loading && <p className="text-sm text-text-muted">Loading feedback...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState icon={MessageSquare} title="No feedback found" description="No feedback matches the current filters." />
      )}

      {!loading && !error && filtered.length > 0 && (
        <FeedbackTable
          feedbackItems={filtered}
          onRowClick={(id) => navigate({ to: "/feedback/$id", params: { id } })}
        />
      )}
    </div>
  )
}
