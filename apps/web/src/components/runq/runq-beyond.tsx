import { runqBeyond, type RunqBeyond, RUNQ } from "./runq-data"

function BeyondCard({ item }: { item: RunqBeyond }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-bg-card/50 p-7 transition-colors hover:border-white/15">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${RUNQ.indigo}1f`, boxShadow: `inset 0 0 0 1px ${RUNQ.indigo}2e` }}
      >
        <item.icon size={22} style={{ color: RUNQ.indigoLight }} />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <h3 className="font-heading text-lg font-semibold text-text-primary">{item.title}</h3>
        {item.tag && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
            style={{ backgroundColor: `${RUNQ.cyan}1f`, color: RUNQ.cyan }}
          >
            {item.tag}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
    </div>
  )
}

/** runQ is a full ERP — HR/Payroll, Inventory, Manufacturing all ship too. */
function RunqBeyondSection() {
  return (
    <section className="border-t border-white/5 bg-white/[0.02] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: RUNQ.indigoLight }}>
            Beyond finance
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            A full ERP when you need it.
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Start with finance and grow into the rest — same platform, same books.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {runqBeyond.map((item) => (
            <BeyondCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { RunqBeyondSection }
