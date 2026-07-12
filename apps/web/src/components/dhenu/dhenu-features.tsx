import { features, DH } from "./dhenu-data"

/** Everything Dhenu ships, at a glance. */
function DhenuFeatures() {
  return (
    <section className="border-t border-white/5 bg-white/[0.02] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: DH.greenLight }}>
            Everything included
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Built for how dairies actually run.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-bg-card/40 px-4 py-4 transition-colors hover:border-white/15"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${DH.green}1f` }}>
                <f.icon size={17} style={{ color: DH.greenLight }} />
              </span>
              <span className="text-sm font-medium leading-snug text-text-primary">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { DhenuFeatures }
