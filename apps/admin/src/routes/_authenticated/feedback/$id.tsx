import { useState, useEffect } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft, Paperclip } from "lucide-react"
import { api } from "~/lib/api"
import { Card } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Select } from "~/components/ui/select"
import { Badge } from "~/components/ui/badge"
import {
  FEEDBACK_CATEGORY,
  FEEDBACK_PRIORITY,
  FEEDBACK_STATUS,
} from "@quartex/shared"
import type { Feedback, FeedbackStatus } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/feedback/$id")({
  component: FeedbackDetailPage,
})

interface FeedbackDetailResponse {
  feedback: Feedback & { testerName: string; testerEmail: string; attachments?: string[] }
}

const statusOptions = Object.entries(FEEDBACK_STATUS).map(([k, v]) => ({ value: k, label: v.label }))

function MetaSection({ feedback }: { feedback: FeedbackDetailResponse["feedback"] }) {
  const cat = FEEDBACK_CATEGORY[feedback.category]
  const pri = FEEDBACK_PRIORITY[feedback.priority]
  const sta = FEEDBACK_STATUS[feedback.status]
  return (
    <div className="flex flex-wrap gap-2">
      <Badge label={cat.label} color={cat.color} size="sm" />
      <Badge label={pri.label} color={pri.color} size="sm" />
      <Badge label={sta.label} color={sta.color} size="sm" />
    </div>
  )
}

function FeedbackDetailPage() {
  const { id } = Route.useParams()
  const [data, setData] = useState<FeedbackDetailResponse["feedback"] | null>(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [status, setStatus] = useState<FeedbackStatus>("open")
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<FeedbackDetailResponse>(`/feedback/${id}`)
      .then((r) => {
        setData(r.feedback)
        setAdminNotes(r.feedback.adminNotes ?? "")
        setStatus(r.feedback.status)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleSave = () => {
    setSaving(true)
    setSaveError(null)
    api
      .put(`/feedback/${id}`, { adminNotes, status })
      .then(() => setData((prev) => prev ? { ...prev, adminNotes, status } : prev))
      .catch((err: Error) => setSaveError(err.message))
      .finally(() => setSaving(false))
  }

  if (loading) return <div className="p-8 text-sm text-text-muted">Loading...</div>
  if (!data) return <div className="p-8 text-sm text-red-400">Feedback not found.</div>

  return (
    <div className="p-8 flex flex-col gap-6 max-w-2xl">
      <Link to="/feedback" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors w-fit">
        <ArrowLeft size={16} /> Back to Feedback
      </Link>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-semibold text-text-primary">{data.title}</h2>
        <MetaSection feedback={data} />
      </div>

      <Card>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary leading-relaxed">{data.description}</p>
          {data.stepsToReproduce && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">Steps to Reproduce</p>
              <p className="text-sm text-text-secondary whitespace-pre-wrap">{data.stepsToReproduce}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-6 pt-2 border-t border-border">
            {data.deviceInfo && <div><p className="text-xs text-text-muted">Device</p><p className="text-sm text-text-primary">{data.deviceInfo}</p></div>}
            {data.appVersion && <div><p className="text-xs text-text-muted">App Version</p><p className="text-sm text-text-primary">{data.appVersion}</p></div>}
            <div><p className="text-xs text-text-muted">Tester</p><p className="text-sm text-text-primary">{data.testerName}</p><p className="text-xs text-text-muted">{data.testerEmail}</p></div>
          </div>
        </div>
      </Card>

      {data.attachments && data.attachments.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-text-secondary">Attachments</p>
          {data.attachments.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-accent hover:underline">
              <Paperclip size={14} /> Attachment {i + 1}
            </a>
          ))}
        </div>
      )}

      <Card>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Admin Actions</p>
          <Select label="Status" options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value as FeedbackStatus)} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Admin Notes</label>
            <textarea
              className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-150 min-h-[80px]"
              placeholder="Internal notes about this feedback..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
          {saveError && <p className="text-xs text-red-400">{saveError}</p>}
          <Button onClick={handleSave} disabled={saving} className="w-fit">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
