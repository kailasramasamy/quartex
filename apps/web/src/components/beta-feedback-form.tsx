import { useState } from "react"
import { Button } from "~/components/button"
import { FEEDBACK_CATEGORY, FEEDBACK_PRIORITY } from "@quartex/shared"
import type { FeedbackCategory, FeedbackPriority } from "@quartex/shared"

interface FeedbackFormData {
  email: string
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

export function BetaFeedbackForm({
  programId,
  appName,
  onSuccess,
}: BetaFeedbackFormProps) {
  const [form, setForm] = useState<FeedbackFormData>({
    email: "",
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

  function handleChange(field: keyof FeedbackFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const payload = {
        programId,
        email: form.email,
        category: form.category,
        priority: form.priority,
        title: form.title,
        description: form.description,
        stepsToReproduce: form.stepsToReproduce || undefined,
        deviceInfo: form.deviceInfo || undefined,
        appVersion: form.appVersion || undefined,
      }
      const res = await fetch("/api/v1/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Failed to submit feedback. Please try again.")
        return
      }
      onSuccess()
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Your Email</label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <p className="text-xs text-text-muted mt-1">
          Used to identify your tester account for {appName}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Category</label>
          <select
            required
            className={selectClass}
            value={form.category}
            onChange={(e) =>
              handleChange("category", e.target.value as FeedbackCategory)
            }
          >
            {CATEGORIES.map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Priority</label>
          <select
            required
            className={selectClass}
            value={form.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value as FeedbackPriority)
            }
          >
            {PRIORITIES.map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          required
          placeholder="Brief summary of the issue or suggestion"
          className={inputClass}
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={4}
          placeholder="Describe the issue or suggestion in detail..."
          className={`${inputClass} resize-none`}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>
          Steps to Reproduce{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder={"1. Open the app\n2. Tap on...\n3. Notice that..."}
          className={`${inputClass} resize-none`}
          value={form.stepsToReproduce}
          onChange={(e) => handleChange("stepsToReproduce", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>
            Device Info{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. iPhone 15, iOS 17"
            className={inputClass}
            value={form.deviceInfo}
            onChange={(e) => handleChange("deviceInfo", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>
            App Version{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 1.2.0"
            className={inputClass}
            value={form.appVersion}
            onChange={(e) => handleChange("appVersion", e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  )
}
