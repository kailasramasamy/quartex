import { useEffect, useState } from "react"
import { Plus, Package, Bell } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Modal } from "~/components/ui/modal"
import { Input } from "~/components/ui/input"
import { Select } from "~/components/ui/select"
import { EmptyState } from "~/components/ui/empty-state"
import { Badge } from "~/components/ui/badge"
import { api } from "~/lib/api"
import { PLATFORM } from "@quartex/shared"
import type { Release, Platform } from "@quartex/shared"

interface ProgramReleasesTabProps {
  programId: string
  onCountChange: (count: number) => void
}

interface ReleaseFormData {
  version: string
  platform: Platform
  releaseNotes: string
  downloadLink: string
}

const PLATFORM_OPTIONS = [
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "web", label: "Web" },
]

interface ReleaseFormProps {
  programId: string
  onCreated: (r: Release) => void
  onClose: () => void
}

function useReleaseForm(programId: string, onCreated: (r: Release) => void, onClose: () => void) {
  const [form, setForm] = useState<ReleaseFormData>({ version: "", platform: "android", releaseNotes: "", downloadLink: "" })
  const [isLoading, setIsLoading] = useState(false)
  const set = (key: keyof ReleaseFormData, value: string) => setForm((prev) => ({ ...prev, [key]: value }))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await api.post<{ release: Release }>(`/releases/by-program/${programId}`, form)
      onCreated(res.release)
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  return { form, set, isLoading, handleSubmit }
}

function ReleaseForm({ programId, onCreated, onClose }: ReleaseFormProps) {
  const { form, set, isLoading, handleSubmit } = useReleaseForm(programId, onCreated, onClose)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Version" value={form.version} onChange={(e) => set("version", e.target.value)} placeholder="1.0.0" required />
        <Select label="Platform" options={PLATFORM_OPTIONS} value={form.platform} onChange={(e) => set("platform", e.target.value as Platform)} />
      </div>
      <Input label="Download Link (optional)" value={form.downloadLink} onChange={(e) => set("downloadLink", e.target.value)} placeholder="https://..." />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">Release Notes</label>
        <textarea value={form.releaseNotes} onChange={(e) => set("releaseNotes", e.target.value)} rows={4} required className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="What's new in this release?" />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? "Creating..." : "Create Release"}</Button>
      </div>
    </form>
  )
}

function ReleaseCard({ release, onNotify }: { release: Release; onNotify: (id: string) => void }) {
  const [notifying, setNotifying] = useState(false)
  const p = PLATFORM[release.platform]

  const handleNotify = async () => {
    setNotifying(true)
    try {
      await api.post(`/releases/${release.id}/notify`)
      onNotify(release.id)
    } catch (err) {
      console.error(err)
    } finally {
      setNotifying(false)
    }
  }

  return (
    <div className="bg-bg-secondary rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-text-primary">v{release.version}</span>
          <Badge label={p.label} color={p.color} size="sm" />
          {release.isNotified && <Badge label="Notified" color="#10B981" size="sm" />}
        </div>
        {!release.isNotified && (
          <Button size="sm" variant="secondary" onClick={handleNotify} disabled={notifying}>
            <Bell size={14} />
            {notifying ? "Notifying..." : "Notify Testers"}
          </Button>
        )}
      </div>
      <p className="text-sm text-text-secondary whitespace-pre-line">{release.releaseNotes}</p>
      <p className="text-xs text-text-muted">
        {new Date(release.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
  )
}

function useReleasesData(programId: string, onCountChange: (n: number) => void) {
  const [releases, setReleases] = useState<Release[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    api.get<{ releases: Release[] }>(`/releases/by-program/${programId}`)
      .then((res) => { setReleases(res.releases); onCountChange(res.releases.length) })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [programId, onCountChange])

  const handleCreated = (release: Release) => {
    setReleases((prev) => { const next = [release, ...prev]; onCountChange(next.length); return next })
  }
  const handleNotified = (id: string) => {
    setReleases((prev) => prev.map((r) => (r.id === id ? { ...r, isNotified: true } : r)))
  }

  return { releases, isLoading, handleCreated, handleNotified }
}

function ReleasesList({ releases, onNotify, programId, onCreated, showModal, setShowModal }: {
  releases: Release[]
  onNotify: (id: string) => void
  programId: string
  onCreated: (r: Release) => void
  showModal: boolean
  setShowModal: (v: boolean) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setShowModal(true)}><Plus size={14} /> Create Release</Button>
      </div>
      {releases.length === 0
        ? <EmptyState icon={Package} title="No releases yet" description="Create a release to notify testers of new builds." />
        : releases.map((r) => <ReleaseCard key={r.id} release={r} onNotify={onNotify} />)
      }
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Release">
        <ReleaseForm programId={programId} onCreated={onCreated} onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}

function ProgramReleasesTab({ programId, onCountChange }: ProgramReleasesTabProps) {
  const [showModal, setShowModal] = useState(false)
  const { releases, isLoading, handleCreated, handleNotified } = useReleasesData(programId, onCountChange)

  if (isLoading) return <p className="text-sm text-text-muted text-center py-8">Loading releases...</p>

  return <ReleasesList releases={releases} onNotify={handleNotified} programId={programId} onCreated={handleCreated} showModal={showModal} setShowModal={setShowModal} />
}

export { ProgramReleasesTab }
