import { Fragment } from "react"
import { ChevronRight } from "lucide-react"
import { chain, DH } from "./dhenu-data"

/** The village-to-plant flow Dhenu digitises, shown as a connected chain. */
function DhenuChain() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: DH.greenLight }}>
          One chain, one app
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Every litre, from the village pour to the plant.
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {chain.map((step, i) => (
            <Fragment key={step.label}>
              <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-white/8 bg-bg-card/50 px-4 py-6 text-center sm:w-40">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${DH.green}1f`, boxShadow: `inset 0 0 0 1px ${DH.green}2e` }}
                >
                  <step.icon size={22} style={{ color: DH.greenLight }} />
                </span>
                <span className="font-heading text-base font-semibold text-text-primary">{step.label}</span>
                <span className="text-xs text-text-secondary">{step.note}</span>
              </div>
              {i < chain.length - 1 && (
                <ChevronRight size={22} className="shrink-0 rotate-90 sm:rotate-0" style={{ color: DH.green }} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export { DhenuChain }
