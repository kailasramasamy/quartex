import { createFileRoute, Link } from "@tanstack/react-router"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { Button } from "~/components/button"
import { buildMeta } from "@quartex/shared"
import { FlaskConical, Gift, MessageSquare, Shield } from "lucide-react"

export const Route = createFileRoute("/beta/")({
  head: () => ({
    meta: buildMeta({
      title: "Beta Testing Program",
      description:
        "Join Quartex beta testing programs. Test our apps, share feedback, and earn rewards.",
    }),
  }),
  component: BetaLandingPage,
})

const perks = [
  {
    icon: FlaskConical,
    title: "Early Access",
    description: "Be the first to try new features before public launch.",
    color: "#3B82F6",
  },
  {
    icon: Gift,
    title: "Rewards",
    description: "Earn gift cards and exclusive perks for your feedback.",
    color: "#F59E0B",
  },
  {
    icon: MessageSquare,
    title: "Shape the Product",
    description: "Your feedback directly influences what we build next.",
    color: "#10B981",
  },
  {
    icon: Shield,
    title: "Trusted Community",
    description: "Join a select group of testers across Quartex products.",
    color: "#8B5CF6",
  },
]

function BetaLandingPage() {
  return (
    <main className="min-h-screen">
      <SectionWrapper className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/50 px-4 py-1.5 text-sm text-text-secondary">
            <FlaskConical size={14} className="text-accent" />
            Beta Testing Program
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-5">
            Help Us Build <GradientText>Better Software</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Quartex runs beta testing programs for our products. Test early
            versions, report bugs, suggest improvements, and earn rewards for
            your contribution.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16 bg-bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk) => (
            <PerkCard key={perk.title} {...perk} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <div className="space-y-6 text-left mt-10">
            <Step number={1} title="Get Invited" description="Receive an invite link from the Quartex team via WhatsApp, Telegram, or email." />
            <Step number={2} title="Register" description="Sign up with your name, email, and phone. Choose your platform (Android, iOS, or Web)." />
            <Step number={3} title="Test & Feedback" description="Install the app, use it during the testing period, and submit bug reports or suggestions." />
            <Step number={4} title="Earn Rewards" description="After the testing period, receive your reward as a thank you for your contribution." />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16 bg-bg-secondary">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
            Have an Invite Code?
          </h2>
          <p className="text-text-secondary mb-6">
            If you already have an invite code, you can go directly to the
            program page to register.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Contact Us to Join
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </main>
  )
}

function PerkCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: typeof FlaskConical
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-6">
      <div
        className="mb-4 inline-flex rounded-lg p-3"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="font-heading text-base font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function Step({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-heading font-bold text-accent text-sm">
        {number}
      </div>
      <div>
        <h3 className="font-heading font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
