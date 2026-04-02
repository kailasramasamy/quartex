import { useState } from "react"
import { Button } from "~/components/button"
import { FEEDBACK_CATEGORY, FEEDBACK_PRIORITY } from "@quartex/shared"
import type { FeedbackCategory, FeedbackPriority } from "@quartex/shared"

interface FeedbackFormData {
  category: FeedbackCategory
  priority: FeedbackPriority
  title: string
  description: string
  stepsToReproduce: string
  deviceInfo: string
  appVersion: string
}

interface BetaFeedbackFormProps {
  programId: string
  appName: string
  onSuccess: () => void
}

const inputClass =
  "w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors font-body text-sm"

const labelClass = "block text-sm font-medium text-text-secondary mb-1.5"

const selectClass = `${inputClass} appearance-none cursor-pointer`

const CATEGORIES = Object.entries(FEEDBACK_CATEGORY) as [
  FeedbackCategory,
  { label: string; color: string },
][]

const PRIORITIES = Object.entries(FEEDBACK_PRIORITY) as [
  FeedbackPriority,
  { label: string; color: string },
][]

function EmailStep({
  appName,
  onVerified,
}: {
  appName: string
  onVerified: (email: string, testerName: string) => void
}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/v1/testers/lookup?email=${encodeURIComponent(email)}`)
      if (!res.ok) {
        setError("Email not found. Make sure you registered for this beta program.")
        return
      }
      const data = await res.json() as { name: string }
      onVerified(email, data.name)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleVerify} className="space-y-5">
      <div>
        <label className={labelClass}>Your Email</label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-xs text-text-muted mt-1">
          Enter the email you used to register for {appName}
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Verifying..." : "Continue"}
      </Button>
    </form>
  )
}

function FeedbackFields({
  programId,
  testerEmail,
  testerName,
  onSuccess,
}: {
  programId: string
  testerEmail: string
  testerName: string
  onSuccess: () => void
}) {
  const [form, setForm] = useState<FeedbackFormData>({
    category: "bug",
    priority: "medium",
    title: "",
    description: "",
    stepsToReproduce: "",
    deviceInfo: "",
    appVersion: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: keyof FeedbackFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/v1/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          testerEmail,
          ...form,
          stepsToReproduce: form.stepsToReproduce || undefined,
          deviceInfo: form.deviceInfo || undefined,
          appVersion: form.appVersion || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Failed to submit feedback.")
        return
      }
      onSuccess()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-3 bg-bg-secondary rounded-lg px-4 py-3 border border-border">
        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
          {testerName[0]?.toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{testerName}</p>
          <p className="text-xs text-text-muted">{testerEmail}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Category</label>
          <select required className={selectClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Priority</label>
          <select required className={selectClass} value={form.priority} onChange={(e) => set("priority", e.target.value)}>
            {PRIORITIES.map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input type="text" required placeholder="Brief summary of the issue" className={inputClass} value={form.title} onChange={(e) => set("title", e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea required rows={4} placeholder="Describe the issue in detail..." className={`${inputClass} resize-none`} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Steps to Reproduce <span className="text-text-muted font-normal">(optional)</span></label>
        <textarea rows={3} placeholder={"1. Open the app\n2. Tap on...\n3. Notice that..."} className={`${inputClass} resize-none`} value={form.stepsToReproduce} onChange={(e) => set("stepsToReproduce", e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Device Info <span className="text-text-muted font-normal">(optional)</span></label>
          <input type="text" placeholder="e.g. iPhone 15, iOS 17" className={inputClass} value={form.deviceInfo} onChange={(e) => set("deviceInfo", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>App Version <span className="text-text-muted font-normal">(optional)</span></label>
          <input type="text" placeholder="e.g. 1.2.0" className={inputClass} value={form.appVersion} onChange={(e) => set("appVersion", e.target.value)} />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  )
}

export function BetaFeedbackForm({ programId, appName, onSuccess }: BetaFeedbackFormProps) {
  const [verified, setVerified] = useState<{ email: string; name: string } | null>(null)

  if (!verified) {
    return <EmailStep appName={appName} onVerified={(email, name) => setVerified({ email, name })} />
  }

  return (
    <FeedbackFields
      programId={programId}
      testerEmail={verified.email}
      testerName={verified.name}
      onSuccess={onSuccess}
    />
  )
}
