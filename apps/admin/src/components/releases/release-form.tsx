import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Select } from "~/components/ui/select"
import { PLATFORM } from "@quartex/shared"
import type { Platform } from "@quartex/shared"

interface ReleaseFormData {
  version: string
  platform: Platform
  releaseNotes: string
  downloadLink: string
  notifyTesters: boolean
}

interface ReleaseFormProps {
  onSubmit: (data: ReleaseFormData) => void
  isLoading: boolean
  platforms: Platform[]
}

function ReleaseForm({ onSubmit, isLoading, platforms }: ReleaseFormProps) {
  const [form, setForm] = useState<ReleaseFormData>({
    version: "",
    platform: platforms[0] ?? "android",
    releaseNotes: "",
    downloadLink: "",
    notifyTesters: false,
  })

  const platformOptions = platforms.map((p) => ({
    value: p,
    label: PLATFORM[p].label,
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const set = <K extends keyof ReleaseFormData>(key: K, value: ReleaseFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Version"
        placeholder="e.g. 1.0.4"
        value={form.version}
        onChange={(e) => set("version", e.target.value)}
        required
      />
      <Select
        label="Platform"
        options={platformOptions}
        value={form.platform}
        onChange={(e) => set("platform", e.target.value as Platform)}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">Release Notes</label>
        <textarea
          className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-150 min-h-[100px]"
          placeholder="What's new in this release..."
          value={form.releaseNotes}
          onChange={(e) => set("releaseNotes", e.target.value)}
          required
        />
      </div>
      <Input
        label="Download Link"
        placeholder="https://..."
        value={form.downloadLink}
        onChange={(e) => set("downloadLink", e.target.value)}
      />
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.notifyTesters}
          onChange={(e) => set("notifyTesters", e.target.checked)}
          className="accent-accent w-4 h-4"
        />
        <span className="text-sm text-text-secondary">Notify testers immediately</span>
      </label>
      <Button type="submit" disabled={isLoading} className="mt-2">
        {isLoading ? "Creating..." : "Create Release"}
      </Button>
    </form>
  )
}

export { ReleaseForm }
export type { ReleaseFormProps, ReleaseFormData }
