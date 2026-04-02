import { Zap, ShoppingCart, Truck, Settings, type LucideIcon, ArrowUpRight } from "lucide-react"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"

interface Vertical {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const verticals: Vertical[] = [
  {
    icon: Zap,
    title: "Quick Commerce",
    description: "Sub-30-minute delivery infrastructure built for speed at scale.",
    color: "#F59E0B",
  },
  {
    icon: ShoppingCart,
    title: "Grocery & Retail",
    description: "End-to-end ordering, inventory, and fulfilment for local stores.",
    color: "#10B981",
  },
  {
    icon: Truck,
    title: "Logistics & Delivery",
    description: "Route optimisation and real-time tracking for delivery fleets.",
    color: "#3B82F6",
  },
  {
    icon: Settings,
    title: "Business Automation",
    description: "Workflow automation and ERP tools that eliminate manual work.",
    color: "#8B5CF6",
  },
]

function DotPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="vert-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vert-dots)" />
    </svg>
  )
}

function VerticalCard({ vertical, index }: { vertical: Vertical; index: number }) {
  const Icon = vertical.icon
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-transparent hover:shadow-lg">
      {/* Gradient background on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top left, ${vertical.color}10, transparent 70%)`,
        }}
      />
      {/* Number watermark */}
      <span className="absolute -right-2 -top-4 font-heading text-7xl font-bold text-white/[0.02] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <div
          className="mb-5 inline-flex rounded-xl p-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${vertical.color}15` }}
        >
          <Icon size={28} style={{ color: vertical.color }} />
        </div>
        <h3 className="mb-3 flex items-center gap-2 font-heading text-xl font-semibold text-text-primary">
          {vertical.title}
          <ArrowUpRight
            size={16}
            className="text-text-muted opacity-0 transition-all duration-200 group-hover:opacity-100"
          />
        </h3>
        <p className="text-base leading-relaxed text-text-secondary">
          {vertical.description}
        </p>
      </div>
    </div>
  )
}

function VerticalsSection() {
  return (
    <div className="relative bg-bg-secondary">
      <DotPattern />
      <SectionWrapper>
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Verticals
          </p>
          <h2 className="font-heading text-4xl font-bold text-text-primary lg:text-5xl">
            Industries We <GradientText>Serve</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            AI-first solutions with deep domain expertise
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {verticals.map((vertical, i) => (
            <VerticalCard key={vertical.title} vertical={vertical} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}

export { VerticalsSection }
