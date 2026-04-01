import { Zap, ShoppingCart, Truck, Settings, type LucideIcon } from "lucide-react"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"

interface Vertical {
  icon: LucideIcon
  title: string
  description: string
}

const verticals: Vertical[] = [
  {
    icon: Zap,
    title: "Quick Commerce",
    description: "Sub-30-minute delivery infrastructure built for speed at scale.",
  },
  {
    icon: ShoppingCart,
    title: "Grocery & Retail",
    description: "End-to-end ordering, inventory, and fulfilment for local stores.",
  },
  {
    icon: Truck,
    title: "Logistics & Delivery",
    description: "Route optimisation and real-time tracking for delivery fleets.",
  },
  {
    icon: Settings,
    title: "Business Automation",
    description: "Workflow automation and ERP tools that eliminate manual work.",
  },
]

function VerticalCard({ vertical }: { vertical: Vertical }) {
  const Icon = vertical.icon
  return (
    <div className="rounded-xl border border-border bg-bg-card p-6 transition-colors duration-200 hover:border-accent/50">
      <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
        <Icon size={22} className="text-accent" />
      </div>
      <h3 className="mb-2 font-heading text-base font-semibold text-text-primary">
        {vertical.title}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {vertical.description}
      </p>
    </div>
  )
}

function VerticalsSection() {
  return (
    <SectionWrapper className="bg-bg-secondary">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-4xl font-bold text-text-primary lg:text-5xl">
          Industries We <GradientText>Serve</GradientText>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {verticals.map((vertical) => (
          <VerticalCard key={vertical.title} vertical={vertical} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export { VerticalsSection }
