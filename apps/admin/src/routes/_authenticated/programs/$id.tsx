import { useCallback, useEffect, useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Tabs } from "~/components/ui/tabs"
import { ProgramOverview } from "~/components/programs/program-overview"
import { ProgramTestersTab } from "~/components/programs/program-testers-tab"
import { ProgramFeedbackTab } from "~/components/programs/program-feedback-tab"
import { ProgramReleasesTab } from "~/components/programs/program-releases-tab"
import { api } from "~/lib/api"
import type { TestProgram } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/programs/$id")({
  component: ProgramDetailPage,
})

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "testers", label: "Testers" },
  { id: "feedback", label: "Feedback" },
  { id: "releases", label: "Releases" },
]

function ProgramDetailPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [program, setProgram] = useState<TestProgram | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [testerCount, setTesterCount] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [releaseCount, setReleaseCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    api
      .get<{ program: TestProgram; stats: { totalTesters: number; totalFeedback: number; totalReleases: number } }>(`/programs/${id}`)
      .then((r) => {
        setProgram(r.program)
        setTesterCount(r.stats.totalTesters ?? 0)
        setFeedbackCount(r.stats.totalFeedback ?? 0)
        setReleaseCount(r.stats.totalReleases ?? 0)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [id])

  const handleTesterCount = useCallback((n: number) => setTesterCount(n), [])
  const handleFeedbackCount = useCallback((n: number) => setFeedbackCount(n), [])
  const handleReleaseCount = useCallback((n: number) => setReleaseCount(n), [])

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-sm text-text-muted">Loading program...</p>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-400">Program not found.</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div>
        {activeTab === "overview" && (
          <ProgramOverview
            program={program}
            testerCount={testerCount}
            feedbackCount={feedbackCount}
            releaseCount={releaseCount}
            onStatusChange={setProgram}
            onEditClick={() => navigate({ to: "/programs/$id/edit", params: { id } })}
            onDelete={() => navigate({ to: "/programs" })}
          />
        )}
        {activeTab === "testers" && (
          <ProgramTestersTab programId={id} onCountChange={handleTesterCount} />
        )}
        {activeTab === "feedback" && (
          <ProgramFeedbackTab programId={id} onCountChange={handleFeedbackCount} />
        )}
        {activeTab === "releases" && (
          <ProgramReleasesTab programId={id} onCountChange={handleReleaseCount} />
        )}
      </div>
    </div>
  )
}
