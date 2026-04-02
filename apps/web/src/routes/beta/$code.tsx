import { useState } from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { BetaRegistrationForm } from "~/components/beta-registration-form"
import { PLATFORM } from "@quartex/shared"
import type { Platform } from "@quartex/shared"
import { API_INTERNAL_URL } from "~/lib/env"

interface InviteProgram {
  name: string
  description: string | null
  platforms: Platform[]
  reward: string
  spotsRemaining: number
  testDurationDays: number
  inviteMessage: string | null
}

export const Route = createFileRoute("/beta/$code")({
  head: ({ loaderData }) => {
    const data = loaderData as InviteProgram | undefined
    return {
      meta: data
        ? [
            { title: `${data.name} Beta Program — Quartex` },
            {
              name: "description",
              content:
                data.description ??
                `Join the ${data.name} beta testing program by Quartex.`,
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
  component: BetaLandingPage,
})

function SuccessScreen({ appName }: { appName: string }) {
  return (
    <div className="text-center py-10 px-6 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6 text-3xl">
        🎉
      </div>
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-2">
        You&apos;re In!
      </h2>
      <p className="text-text-secondary mb-6">
        Welcome to the{" "}
        <span className="text-text-primary font-medium">{appName}</span>{" "}
        beta program. We&apos;re thrilled to have you.
      </p>
      <div className="bg-bg-card border border-border rounded-xl p-5 text-left space-y-3">
        <p className="text-sm font-medium text-text-primary">What&apos;s next:</p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex gap-2">
            <span className="text-accent mt-0.5">→</span>
            You&apos;ll receive a confirmation email with full instructions.
          </li>
          <li className="flex gap-2">
            <span className="text-accent mt-0.5">→</span>
            Install the app and start testing.
          </li>
          <li className="flex gap-2">
            <span className="text-accent mt-0.5">→</span>
            Submit feedback anytime via the feedback link in your email.
          </li>
        </ul>
      </div>
    </div>
  )
}

function BetaLandingPage() {
  const program = Route.useLoaderData() as InviteProgram
  const { code } = Route.useParams()
  const [success, setSuccess] = useState(false)
  const isFull = program.spotsRemaining <= 0

  return (
    <main className="min-h-screen">
      <SectionWrapper className="pt-32">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {program.platforms.map((p: Platform) => (
              <span
                key={p}
                className="text-xs font-medium px-3 py-1 rounded-full border"
                style={{
                  color: PLATFORM[p].color,
                  borderColor: `${PLATFORM[p].color}40`,
                  backgroundColor: `${PLATFORM[p].color}10`,
                }}
              >
                {PLATFORM[p].label}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-3">
            <GradientText>{program.name}</GradientText> Beta Program
          </h1>

          {program.description && (
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              {program.description}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            <InfoCard label="Reward" value={program.reward} />
            <InfoCard label="Duration" value={`${program.testDurationDays} days`} />
            <InfoCard
              label="Spots"
              value={`${program.spotsRemaining} remaining`}
            />
          </div>

          <div className="bg-bg-card border border-border rounded-2xl p-6 md:p-8">
            {isFull ? (
              <div className="text-center py-10">
                <p className="text-2xl mb-3">🔒</p>
                <h2 className="font-heading text-xl font-semibold mb-2">Program Full</h2>
                <p className="text-text-secondary">All spots have been taken.</p>
              </div>
            ) : success ? (
              <SuccessScreen appName={program.name} />
            ) : (
              <>
                <h2 className="font-heading text-xl font-semibold text-text-primary mb-6">
                  Register to Join
                </h2>
                <BetaRegistrationForm
                  code={code}
                  platforms={program.platforms}
                  onSuccess={() => setSuccess(true)}
                />
              </>
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-4">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  )
}
