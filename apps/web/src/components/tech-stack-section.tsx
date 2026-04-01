import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"

interface TechItem {
  name: string
  color: string
  abbr: string
}

const techStack: TechItem[] = [
  { name: "React", abbr: "Re", color: "#61DAFB" },
  { name: "Node.js", abbr: "No", color: "#68A063" },
  { name: "TypeScript", abbr: "TS", color: "#3178C6" },
  { name: "PostgreSQL", abbr: "PG", color: "#336791" },
  { name: "Flutter", abbr: "Fl", color: "#54C5F8" },
  { name: "Tailwind CSS", abbr: "TW", color: "#38BDF8" },
]

function TechBadge({ tech }: { tech: TechItem }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md"
        style={{ backgroundColor: `${tech.color}22`, border: `1.5px solid ${tech.color}44` }}
      >
        <span style={{ color: tech.color }}>{tech.abbr}</span>
      </div>
      <span className="text-sm font-medium text-text-secondary">{tech.name}</span>
    </div>
  )
}

function TechStackSection() {
  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="font-heading text-4xl font-bold text-text-primary lg:text-5xl">
          Built With <GradientText>Modern Tech</GradientText>
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          A battle-tested stack chosen for performance and developer velocity
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-10 lg:max-w-4xl lg:grid-cols-6">
        {techStack.map((tech) => (
          <TechBadge key={tech.name} tech={tech} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export { TechStackSection }
