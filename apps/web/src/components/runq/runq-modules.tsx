import { runqModules, type RunqModule, RUNQ } from "./runq-data"

function ModuleCard({ module: m }: { module: RunqModule }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-32 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 100%, ${RUNQ.indigo}55, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${RUNQ.indigo}1f`, boxShadow: `inset 0 0 0 1px ${RUNQ.indigo}2e` }}
        >
          <m.icon size={20} style={{ color: RUNQ.indigoLight }} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <h3 className="font-heading text-base font-semibold text-text-primary">{m.title}</h3>
          {m.tag && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: `${RUNQ.cyan}1f`, color: RUNQ.cyan }}
            >
              {m.tag}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{m.blurb}</p>
      </div>
    </div>
  )
}

/** The centerpiece: every module at a glance for a scanning SME owner. */
function RunqModules() {
  return (
    <section id="modules" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: RUNQ.indigoLight }}>
            One system
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Ten modules. No integrations to babysit.
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Every part of your business shares the same books, the same data, the same login.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {runqModules.map((m) => (
            <ModuleCard key={m.title} module={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { RunqModules }
