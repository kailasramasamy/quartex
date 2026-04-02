import { useState } from "react"
import { Button } from "~/components/button"
import { PLATFORM } from "@quartex/shared"
import type { Platform } from "@quartex/shared"

interface RegistrationData {
  name: string
  email: string
  phone: string
  platform: Platform
  deviceInfo: string
}

interface BetaRegistrationFormProps {
  code: string
  platforms: Platform[]
  onSuccess: () => void
}

const inputClass =
  "w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors font-body text-sm"

const labelClass = "block text-sm font-medium text-text-secondary mb-1.5"

export function BetaRegistrationForm({
  code,
  platforms,
  onSuccess,
}: BetaRegistrationFormProps) {
  const [form, setForm] = useState<RegistrationData>({
    name: "",
    email: "",
    phone: "",
    platform: platforms[0],
    deviceInfo: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(field: keyof RegistrationData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/v1/invite/${code}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          deviceInfo: form.deviceInfo || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.")
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
        <label className={labelClass}>Full Name</label>
        <input
          type="text"
          required
          placeholder="Your name"
          className={inputClass}
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          type="tel"
          required
          placeholder="+91 98765 43210"
          className={inputClass}
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Platform</label>
        <div className="flex gap-3 flex-wrap">
          {platforms.map((platform) => (
            <label
              key={platform}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${
                form.platform === platform
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-bg-primary text-text-secondary hover:border-accent/50"
              }`}
            >
              <input
                type="radio"
                name="platform"
                value={platform}
                checked={form.platform === platform}
                onChange={() => handleChange("platform", platform)}
                className="sr-only"
              />
              {PLATFORM[platform].label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Device Info{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Samsung Galaxy S24, Android 14"
          className={inputClass}
          value={form.deviceInfo}
          onChange={(e) => handleChange("deviceInfo", e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          className="accent-accent mt-1"
        />
        <span className="text-xs text-text-secondary leading-relaxed">
          I agree to receive emails about this beta program including testing
          instructions, release updates, and reward notifications. I can
          unsubscribe at any time.
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Registering..." : "Join Beta Program"}
      </Button>
    </form>
  )
}
