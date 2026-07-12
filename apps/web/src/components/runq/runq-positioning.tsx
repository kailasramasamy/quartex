import { Check, MapPin, Landmark, Smartphone } from "lucide-react"
import { RUNQ } from "./runq-data"

const chips = [
  { icon: MapPin, label: "India-first" },
  { icon: Landmark, label: "GST-ready" },
  { icon: Smartphone, label: "Web + Mobile" },
]

/** Honest positioning: runQ for daily ops, Tally for CA compliance. */
function RunqPositioning() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <p className="flex items-center gap-3 text-center text-sm text-text-secondary lg:text-left">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${RUNQ.indigo}26` }}
          >
            <Check size={14} style={{ color: RUNQ.indigoLight }} />
          </span>
          Works alongside Tally —{" "}
          <span className="font-medium text-text-primary">runQ for daily operations</span>, Tally
          for CA compliance.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-card px-3.5 py-1.5 text-xs font-medium text-text-secondary"
            >
              <c.icon size={14} style={{ color: RUNQ.indigoLight }} />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export { RunqPositioning }
