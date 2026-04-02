import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Select } from "~/components/ui/select"
import { QUARTEX_APPS } from "@quartex/shared"
import type { TestProgram, Platform } from "@quartex/shared"

interface ProgramFormProps {
  initialData?: Partial<TestProgram>
  onSubmit: (data: Partial<TestProgram>) => void
  isLoading: boolean
}

const ALL_PLATFORMS: Platform[] = ["android", "ios", "web"]

const APP_OPTIONS = [
  ...QUARTEX_APPS.map((a) => ({ value: a.id, label: a.name })),
  { value: "custom", label: "Custom" },
]

function PlatformCheckboxes({
  selected,
  onChange,
}: {
  selected: Platform[]
  onChange: (p: Platform[]) => void
}) {
  const toggle = (p: Platform) =>
    onChange(selected.includes(p) ? selected.filter((x) => x !== p) : [...selected, p])

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-text-secondary">Platforms</span>
      <div className="flex gap-4">
        {ALL_PLATFORMS.map((p) => (
          <label key={p} className="flex items-center gap-2 cursor-pointer text-sm text-text-primary">
            <input
              type="checkbox"
              checked={selected.includes(p)}
              onChange={() => toggle(p)}
              className="accent-accent"
            />
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </label>
        ))}
      </div>
    </div>
  )
}

function TestLinks({ platforms, links, onChange }: {
  platforms: Platform[]
  links: { android?: string; ios?: string; web?: string }
  onChange: (k: string, v: string) => void
}) {
  return (
    <>
      {platforms.includes("android") && (
        <Input label="Android Test Link" value={links.android ?? ""} onChange={(e) => onChange("androidTestLink", e.target.value)} placeholder="https://play.google.com/..." />
      )}
      {platforms.includes("ios") && (
        <Input label="iOS Test Link" value={links.ios ?? ""} onChange={(e) => onChange("iosTestLink", e.target.value)} placeholder="https://testflight.apple.com/..." />
      )}
      {platforms.includes("web") && (
        <Input label="Web Test Link" value={links.web ?? ""} onChange={(e) => onChange("webTestLink", e.target.value)} placeholder="https://..." />
      )}
    </>
  )
}

interface FormFields {
  form: Partial<TestProgram>
  isCustom: boolean
  set: (key: keyof TestProgram, value: unknown) => void
  handleAppChange: (value: string) => void
  handleLinkChange: (key: string, value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

function FormBody({ form, isCustom, set, handleAppChange, handleLinkChange, handleSubmit, isLoading }: FormFields) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select label="App" options={[{ value: "", label: "Select app..." }, ...APP_OPTIONS]} value={isCustom ? "custom" : (form.appId ?? "")} onChange={(e) => handleAppChange(e.target.value)} />
      {isCustom && (
        <div className="grid grid-cols-2 gap-4">
          <Input label="App ID (slug)" value={form.appId ?? ""} onChange={(e) => set("appId", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="my-app" required />
          <Input label="App Name" value={form.appName ?? ""} onChange={(e) => set("appName", e.target.value)} placeholder="My App" required />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">Description</label>
        <textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="What are testers testing?" />
      </div>
      <PlatformCheckboxes selected={form.platforms ?? []} onChange={(p) => set("platforms", p)} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Max Testers" type="number" min={1} value={form.maxTesters ?? ""} onChange={(e) => set("maxTesters", parseInt(e.target.value))} />
        <Input label="Test Duration (days)" type="number" min={1} value={form.testDurationDays ?? ""} onChange={(e) => set("testDurationDays", parseInt(e.target.value))} />
      </div>
      <Input label="Reward Description" value={form.rewardDescription ?? ""} onChange={(e) => set("rewardDescription", e.target.value)} placeholder="e.g. ₹500 Amazon voucher" />
      <TestLinks platforms={form.platforms ?? []} links={{ android: form.androidTestLink ?? "", ios: form.iosTestLink ?? "", web: form.webTestLink ?? "" }} onChange={handleLinkChange} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">Invite Message (optional)</label>
        <textarea value={form.inviteMessage ?? ""} onChange={(e) => set("inviteMessage", e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="Custom invite message..." />
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Program"}</Button>
      </div>
    </form>
  )
}

function ProgramForm({ initialData = {}, onSubmit, isLoading }: ProgramFormProps) {
  const knownIds: string[] = QUARTEX_APPS.map((a) => a.id)
  const initialIsCustom = !!initialData.appId && !knownIds.includes(initialData.appId)

  const [form, setForm] = useState<Partial<TestProgram>>({
    appId: initialData.appId ?? "",
    appName: initialData.appName ?? "",
    description: initialData.description ?? "",
    platforms: initialData.platforms ?? [],
    maxTesters: initialData.maxTesters ?? 10,
    testDurationDays: initialData.testDurationDays ?? 14,
    rewardDescription: initialData.rewardDescription ?? "",
    inviteMessage: initialData.inviteMessage ?? "",
    androidTestLink: initialData.androidTestLink ?? "",
    iosTestLink: initialData.iosTestLink ?? "",
    webTestLink: initialData.webTestLink ?? "",
  })
  const [isCustom, setIsCustom] = useState(initialIsCustom)

  const set = (key: keyof TestProgram, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleAppChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true)
      setForm((prev) => ({ ...prev, appId: "", appName: "" }))
    } else {
      setIsCustom(false)
      const app = QUARTEX_APPS.find((a) => a.id === value)
      setForm((prev) => ({ ...prev, appId: value, appName: app?.name ?? prev.appName }))
    }
  }

  const handleLinkChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <FormBody
      form={form}
      isCustom={isCustom}
      set={set}
      handleAppChange={handleAppChange}
      handleLinkChange={handleLinkChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export { ProgramForm }
export type { ProgramFormProps }
