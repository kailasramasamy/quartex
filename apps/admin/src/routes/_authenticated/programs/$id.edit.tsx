import { useEffect, useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { ProgramForm } from "~/components/programs/program-form"
import { api } from "~/lib/api"
import type { TestProgram } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/programs/$id/edit")({
  component: EditProgramPage,
})

function EditProgramPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [program, setProgram] = useState<TestProgram | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .get<TestProgram>(`/programs/${id}`)
      .then(setProgram)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [id])

  const handleSubmit = async (data: Partial<TestProgram>) => {
    setIsSaving(true)
    setError(null)
    try {
      await api.put<TestProgram>(`/programs/${id}`, data)
      navigate({ to: "/programs/$id", params: { id } })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update program")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/programs/$id", params: { id } })}
        >
          <ArrowLeft size={16} />
        </Button>
        <h1 className="font-heading text-2xl font-semibold text-text-primary">
          Edit Program
        </h1>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Card>
        {isLoading ? (
          <p className="text-sm text-text-muted text-center py-4">Loading...</p>
        ) : program ? (
          <ProgramForm initialData={program} onSubmit={handleSubmit} isLoading={isSaving} />
        ) : (
          <p className="text-sm text-red-400">Program not found.</p>
        )}
      </Card>
    </div>
  )
}
