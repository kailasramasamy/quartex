import { useState, useEffect, useMemo } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Users } from "lucide-react"
import { api } from "~/lib/api"
import { Input } from "~/components/ui/input"
import { EmptyState } from "~/components/ui/empty-state"
import { TesterTable } from "~/components/testers/tester-table"
import type { Tester } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/testers/")({
  component: TestersPage,
})

interface TesterListResponse {
  data: Array<Tester & { programCount?: number }>
  total: number
}

function TestersPage() {
  const navigate = useNavigate()
  const [testers, setTesters] = useState<Array<Tester & { programCount?: number }>>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .get<TesterListResponse>("/testers?page=1&limit=20")
      .then((res) => setTesters(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return testers
    const q = search.toLowerCase()
    return testers.filter(
      (t) => t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q),
    )
  }, [testers, search])

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-text-primary">Testers</h2>
        <span className="text-sm text-text-muted">{testers.length} total</span>
      </div>

      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {loading && (
        <p className="text-sm text-text-muted">Loading testers...</p>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon={Users}
          title="No testers found"
          description={search ? "Try a different search term." : "No testers have registered yet."}
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <TesterTable
          testers={filtered}
          onRowClick={(id) => navigate({ to: "/testers/$id", params: { id } })}
        />
      )}
    </div>
  )
}
