import { useState } from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { BetaFeedbackForm } from "~/components/beta-feedback-form"
import type { Platform } from "@quartex/shared"
import { API_INTERNAL_URL } from "~/lib/env"

interface InviteProgram {
  id: string
  name: string
  description: string | null
  platforms: Platform[]
  reward: string
  spotsRemaining: number
  testDurationDays: number
}

export const Route = createFileRoute("/beta/$code_/feedback")({
  head: ({ loaderData }) => {
    const data = loaderData as InviteProgram | undefined
    return {
      meta: data
        ? [
            { title: `Submit Feedback — ${data.name} Beta` },
            {
              name: "description",
              content: `Submit feedback for the ${data.name} beta testing program.`,
            },
          ]
        : [],
    }
  },
  loader: async ({ params }): Promise<InviteProgram> => {
    const res = await fetch(
      `${API_INTERNAL_URL}/api/v1/invite/${params.code}`,
    )
    if (!res.ok) throw notFound()
    return res.json()
  },
  component: FeedbackPage,
})

function ThankYouScreen({ appName }: { appName: string }) {
  return (
    <div className="text-center py-10 px-6 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6 text-3xl">
        ✅
      </div>
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-2">
        Thank You!
      </h2>
      <p className="text-text-secondary leading-relaxed">
        Your feedback for{" "}
        <span className="text-text-primary font-medium">{appName}</span> has
        been submitted. Our team reviews every report and we truly appreciate
        you helping us improve.
      </p>
    </div>
  )
}

function FeedbackPage() {
  const program = Route.useLoaderData() as InviteProgram
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen">
      <SectionWrapper className="pt-32">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-3">
              Submit <GradientText>Feedback</GradientText>
            </h1>
            <p className="text-text-secondary text-lg">
              for the{" "}
              <span className="text-text-primary font-medium">
                {program.name}
              </span>{" "}
              beta program
            </p>
          </div>

          <div className="bg-bg-card border border-border rounded-2xl p-6 md:p-8">
            {submitted ? (
              <ThankYouScreen appName={program.name} />
            ) : (
              <BetaFeedbackForm
                programId={program.id}
                appName={program.name}
                onSuccess={() => setSubmitted(true)}
              />
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
