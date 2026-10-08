import { stats, steps, MT } from "./martly-data"

function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-bg-primary px-5 py-6 text-center">
          <div className="font-heading text-3xl font-bold tracking-tight" style={{ color: MT.amber }}>
            {s.value}
          </div>
          <div className="mt-1.5 text-sm text-text-secondary">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/** Headline numbers, then the three-step shopping flow. */
function MartlyHow() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <StatsStrip />
        <p className="mt-20 text-center text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: MT.tealLight }}>
          How it works
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Three taps from craving to doorstep.
        </h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-white/8 bg-bg-card/40 p-6">
              <span className="absolute right-5 top-4 font-heading text-5xl font-bold text-white/[0.06]">{i + 1}</span>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${MT.teal}33`, boxShadow: `inset 0 0 0 1px ${MT.teal}66` }}
              >
                <step.icon size={22} style={{ color: MT.tealLight }} />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export { MartlyHow }
