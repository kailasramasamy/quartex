import { Check } from "lucide-react"
import { runqSpotlights, type RunqSpotlight, type RunqPanelKind, RUNQ } from "./runq-data"
import { RunqDashboardMock } from "./runq-dashboard-mock"
import { BillScanPanel, GstPanel, BankingPanel } from "./runq-feature-panels"

function Chips({ chips }: { chips: string[] }) {
  return (
    <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
      {chips.map((c) => (
        <li key={c} className="flex items-center gap-2.5 text-sm text-text-secondary">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: `${RUNQ.indigo}26` }}
          >
            <Check size={13} style={{ color: RUNQ.indigoLight }} />
          </span>
          {c}
        </li>
      ))}
    </ul>
  )
}

const panels: Record<RunqPanelKind, React.ComponentType> = {
  billscan: BillScanPanel,
  gst: GstPanel,
  banking: BankingPanel,
  dashboard: RunqDashboardMock,
}

/** A light, product-authentic panel that pops off the dark page. */
function SpotlightVisual({ item }: { item: RunqSpotlight }) {
  const Panel = panels[item.panel]
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
        style={{ background: `radial-gradient(circle at 50% 40%, ${RUNQ.indigo}33, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative" style={{ filter: `drop-shadow(0 30px 60px ${RUNQ.indigo}44)` }}>
        <Panel />
      </div>
    </div>
  )
}

function SpotlightRow({ item, index }: { item: RunqSpotlight; index: number }) {
  const reverse = index % 2 === 1
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="mb-5 flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${RUNQ.indigo}1f`, boxShadow: `inset 0 0 0 1px ${RUNQ.indigo}2e` }}
          >
            <item.icon size={18} style={{ color: RUNQ.indigoLight }} />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: RUNQ.indigoLight }}>
            {item.kicker}
          </p>
        </div>
        <h3 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">{item.body}</p>
        <Chips chips={item.chips} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <SpotlightVisual item={item} />
      </div>
    </div>
  )
}

function RunqSpotlights() {
  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-12 sm:px-6 lg:px-8">
        {runqSpotlights.map((item, i) => (
          <SpotlightRow key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

export { RunqSpotlights }
