import { useState, useEffect } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft, User, Mail, Phone } from "lucide-react"
import { api } from "~/lib/api"
import { Card } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { TesterStatusBadge } from "~/components/testers/tester-status-badge"
import { PLATFORM } from "@quartex/shared"
import type { Tester, ProgramTester } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/testers/$id")({
  component: TesterDetailPage,
})

interface TesterDetailResponse {
  tester: Tester
  enrollments: Array<ProgramTester & { programName: string }>
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-text-muted shrink-0" />
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm text-text-primary">{value}</p>
      </div>
    </div>
  )
}

function EnrollmentCard({ enrollment }: { enrollment: ProgramTester & { programName: string } }) {
  const platformCfg = PLATFORM[enrollment.platform]
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-bg-card p-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-primary">{enrollment.programName}</p>
        <p className="text-xs text-text-muted">
          Joined {new Date(enrollment.registeredAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge label={platformCfg.label} color={platformCfg.color} size="sm" />
        <TesterStatusBadge status={enrollment.status} />
      </div>
    </div>
  )
}

function TesterDetailPage() {
  const { id } = Route.useParams()
  const [data, setData] = useState<TesterDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .get<TesterDetailResponse>(`/testers/${id}`)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-8 text-sm text-text-muted">Loading...</div>
  if (error) return <div className="p-8 text-sm text-red-400">{error}</div>
  if (!data) return null

  const { tester, enrollments } = data

  return (
    <div className="p-8 flex flex-col gap-6 max-w-2xl">
      <Link to="/testers" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors w-fit">
        <ArrowLeft size={16} /> Back to Testers
      </Link>

      <h2 className="font-heading text-2xl font-semibold text-text-primary">{tester.name}</h2>

      <Card>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Contact Info</p>
          <InfoRow icon={User} label="Full Name" value={tester.name} />
          <InfoRow icon={Mail} label="Email" value={tester.email} />
          <InfoRow icon={Phone} label="Phone" value={tester.phone} />
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-text-secondary">
          Program Enrollments ({enrollments.length})
        </p>
        {enrollments.length === 0 ? (
          <p className="text-sm text-text-muted">Not enrolled in any programs.</p>
        ) : (
          enrollments.map((e) => <EnrollmentCard key={e.id} enrollment={e} />)
        )}
      </div>
    </div>
  )
}
