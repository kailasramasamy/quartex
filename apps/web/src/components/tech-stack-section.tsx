import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"

interface TechItem {
  name: string
  color: string
  abbr: string
  description: string
}

const techStack: TechItem[] = [
  { name: "React", abbr: "Re", color: "#61DAFB", description: "UI Library" },
  { name: "Node.js", abbr: "No", color: "#68A063", description: "Runtime" },
  { name: "TypeScript", abbr: "TS", color: "#3178C6", description: "Language" },
  { name: "PostgreSQL", abbr: "PG", color: "#336791", description: "Database" },
  { name: "Flutter", abbr: "Fl", color: "#54C5F8", description: "Mobile" },
  { name: "Tailwind", abbr: "TW", color: "#38BDF8", description: "Styling" },
]

const ringAnimation = `
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  .ring-spin { animation: spin-slow 20s linear infinite; }
`

function TechBadge({ tech }: { tech: TechItem }) {
  return (
    <div className="group flex flex-col items-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <svg className="ring-spin absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke={tech.color} strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
        {/* Badge */}
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-base font-bold transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${tech.color}15`,
            border: `1.5px solid ${tech.color}30`,
            boxShadow: `0 0 0 0 ${tech.color}00`,
          }}
        >
          <span style={{ color: tech.color }}>{tech.abbr}</span>
        </div>
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"
          style={{ backgroundColor: tech.color }}
        />
      </div>
      <div className="text-center">
        <span className="block text-sm font-semibold text-text-primary">{tech.name}</span>
        <span className="text-xs text-text-muted">{tech.description}</span>
      </div>
    </div>
  )
}

function TechStackSection() {
  return (
    <SectionWrapper>
      <style>{ringAnimation}</style>
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          Technology
        </p>
        <h2 className="font-heading text-4xl font-bold text-text-primary lg:text-5xl">
          Built With <GradientText>Modern Tech</GradientText>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-text-secondary">
          A battle-tested stack chosen for performance and developer velocity
        </p>
      </div>

      {/* Connection lines behind badges */}
      <div className="relative">
        <svg className="absolute inset-0 h-full w-full opacity-[0.04] hidden lg:block" viewBox="0 0 800 120" fill="none" preserveAspectRatio="none">
          <line x1="80" y1="60" x2="720" y2="60" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <div className="relative mx-auto grid max-w-3xl grid-cols-3 gap-10 lg:max-w-4xl lg:grid-cols-6">
          {techStack.map((tech) => (
            <TechBadge key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export { TechStackSection }
