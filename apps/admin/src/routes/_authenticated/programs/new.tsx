import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { ProgramForm } from "~/components/programs/program-form"
import { api } from "~/lib/api"
import type { TestProgram } from "@quartex/shared"

export const Route = createFileRoute("/_authenticated/programs/new")({
  component: NewProgramPage,
})

function NewProgramPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: Partial<TestProgram>) => {
    setIsLoading(true)
    setError(null)
    try {
      const created = await api.post<TestProgram>("/programs", data)
      navigate({ to: "/programs/$id", params: { id: created.id } })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create program")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/programs" })}
        >
          <ArrowLeft size={16} />
        </Button>
        <h1 className="font-heading text-2xl font-semibold text-text-primary">
          Create Program
        </h1>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Card>
        <ProgramForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Card>
    </div>
  )
}
