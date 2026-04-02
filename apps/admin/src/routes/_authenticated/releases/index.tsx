import { useState, useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { PackageOpen, Bell } from "lucide-react"
import { api } from "~/lib/api"
import { Select } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card } from "~/components/ui/card"
import { EmptyState } from "~/components/ui/empty-state"
import { PLATFORM } from "@quartex/shared"
import type { Release, TestProgram } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/releases/")({
  component: ReleasesPage,
})

function usePrograms() {
  const [programs, setPrograms] = useState<TestProgram[]>([])
  useEffect(() => {
    api
      .get<{ data: Array<{ program: TestProgram }>; pagination: unknown }>("/programs?page=1&limit=100")
      .then((r) => setPrograms(r.data.map((d) => d.program)))
      .catch(() => {})
  }, [])
  return programs
}

function ReleaseCard({ release, onNotify }: { release: Release; onNotify: (id: string) => void }) {
  const platformCfg = PLATFORM[release.platform]
  const date = new Date(release.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-semibold text-text-primary">v{release.version}</span>
          <Badge label={platformCfg.label} color={platformCfg.color} size="sm" />
          {release.isNotified && <Badge label="Notified" color="#10B981" size="sm" />}
        </div>
        <span className="text-xs text-text-muted">{date}</span>
      </div>
      <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{release.releaseNotes}</p>
      <div className="flex items-center gap-3 pt-1">
        {release.downloadLink && (
          <a href={release.downloadLink} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">
            Download link
          </a>
        )}
        {!release.isNotified && (
          <Button variant="secondary" size="sm" onClick={() => onNotify(release.id)}>
            <Bell size={14} /> Notify Testers
          </Button>
        )}
      </div>
    </Card>
  )
}

function ReleasesPage() {
  const programs = usePrograms()
  const [selectedProgramId, setSelectedProgramId] = useState("")
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedProgramId) return
    setLoading(true)
    setError(null)
    api
      .get<{ releases: Release[] }>(`/releases/by-program/${selectedProgramId}`)
      .then((r) => setReleases(r.releases))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [selectedProgramId])

  const handleNotify = (releaseId: string) => {
    api.post(`/releases/${releaseId}/notify`).then(() => {
      setReleases((prev) => prev.map((r) => r.id === releaseId ? { ...r, isNotified: true } : r))
    }).catch(() => {})
  }

  const programOptions = [
    { value: "", label: "Select a program..." },
    ...programs.map((p) => ({ value: p.id, label: p.appName })),
  ]

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-text-primary">Releases</h2>
      </div>

      <Select
        label="Program"
        options={programOptions}
        value={selectedProgramId}
        onChange={(e) => setSelectedProgramId(e.target.value)}
        className="w-56"
      />

      {!selectedProgramId && (
        <EmptyState icon={PackageOpen} title="Select a program" description="Choose a program above to view its releases." />
      )}

      {selectedProgramId && loading && <p className="text-sm text-text-muted">Loading releases...</p>}
      {selectedProgramId && error && <p className="text-sm text-red-400">{error}</p>}

      {selectedProgramId && !loading && !error && releases.length === 0 && (
        <EmptyState icon={PackageOpen} title="No releases yet" description="No releases have been created for this program." />
      )}

      {selectedProgramId && !loading && !error && releases.length > 0 && (
        <div className="flex flex-col gap-4">
          {releases.map((r) => (
            <ReleaseCard key={r.id} release={r} onNotify={handleNotify} />
          ))}
        </div>
      )}

    </div>
  )
}
