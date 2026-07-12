import { runqPlatform, RUNQ } from "./runq-data"

/** Trust signals owners care about — all shipped platform capabilities. */
function RunqPlatform() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Built for real businesses
          </h2>
          <p className="mt-3 text-base text-text-secondary">
            Multi-tenant, role-aware, and auditable from day one.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {runqPlatform.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-bg-card/40 px-4 py-6 text-center transition-colors hover:border-white/15"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${RUNQ.indigo}1f` }}
              >
                <item.icon size={20} style={{ color: RUNQ.indigoLight }} />
              </div>
              <span className="text-xs font-medium leading-snug text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { RunqPlatform }
