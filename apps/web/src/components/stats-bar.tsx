import { GradientText } from "~/components/gradient-text"

const stats = [
  { value: "3+", label: "Products Shipped" },
  { value: "10K+", label: "Orders Processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "<200ms", label: "Avg Response" },
]

function StatsBar() {
  return (
    <section className="relative border-y border-border bg-bg-secondary/50 py-14">
      {/* Subtle background pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-heading text-3xl font-bold lg:text-4xl">
              <GradientText>{stat.value}</GradientText>
            </div>
            <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { StatsBar }
