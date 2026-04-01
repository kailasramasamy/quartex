import { useState } from "react"
import { Button } from "~/components/button"
import { Send } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-bg-card rounded-2xl border border-border p-10 text-center">
        <div className="rounded-full bg-accent/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Send size={28} className="text-accent" />
        </div>
        <h3 className="font-heading text-xl font-semibold mb-2">
          Message Received
        </h3>
        <p className="text-text-secondary">
          We'll get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-card rounded-2xl border border-border p-8 space-y-6"
    >
      <FormField
        label="Name"
        value={form.name}
        onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        required
      />
      <FormField
        label="Email"
        type="email"
        value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        required
      />
      <div>
        <label className="block font-body text-sm text-text-secondary mb-2">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>
      <Button variant="primary" size="lg" type="submit">
        Send Message
      </Button>
    </form>
  )
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <div>
      <label className="block font-body text-sm text-text-secondary mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary font-body text-sm focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}

export { ContactForm }
