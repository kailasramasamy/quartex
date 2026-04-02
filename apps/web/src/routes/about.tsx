import { createFileRoute } from "@tanstack/react-router"
import { buildMeta } from "@quartex/shared"
import { PageHeader } from "~/components/page-header"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { Code, Rocket, Users, Target } from "lucide-react"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildMeta({
      title: "About",
      description:
        "Quartex Technologies builds AI-powered software for quick commerce, logistics, and business automation.",
    }),
  }),
  component: AboutPage,
})

const values = [
  {
    icon: Rocket,
    title: "Speed First",
    description:
      "We ship fast, iterate faster. Every product is built for sub-second responsiveness and rapid deployment.",
  },
  {
    icon: Code,
    title: "Engineering Excellence",
    description:
      "Clean architecture, type-safe code, and battle-tested infrastructure. No shortcuts.",
  },
  {
    icon: Users,
    title: "User Obsessed",
    description:
      "Every feature starts with a real problem. We build what operators actually need, not what looks good in demos.",
  },
  {
    icon: Target,
    title: "Domain Focused",
    description:
      "Deep vertical expertise in quick commerce and logistics. We understand the domain before writing a single line.",
  },
]

function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Quartex"
        subtitle="We build AI-powered software for modern commerce operations."
      />

      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-heading text-3xl font-bold mb-6">
            <GradientText>Our Story</GradientText>
          </h2>
          <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
            <p>
              Quartex Technologies started with a simple observation: the tools
              powering quick commerce and hyperlocal delivery were either
              too generic or too expensive for growing operations.
            </p>
            <p>
              We set out to build purpose-fit software — lean, fast, and
              designed for the realities of sub-30-minute delivery, perishable
              inventory, and razor-thin margins.
            </p>
            <p>
              Today, Quartex is an umbrella for multiple products spanning
              grocery delivery, ERP, and business automation — all built on a
              shared foundation of modern engineering.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-bg-secondary">
        <h2 className="font-heading text-3xl font-bold mb-12 text-center">
          <GradientText>What Drives Us</GradientText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Rocket
  title: string
  description: string
}) {
  return (
    <div className="bg-bg-card rounded-xl p-6 border border-border">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-accent/10 p-3 shrink-0">
          <Icon size={24} className="text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
