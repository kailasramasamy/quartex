import { useState } from "react"
import { Check } from "lucide-react"
import { platformTabs, platformExtras, MT } from "./martly-data"

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f16] shadow-2xl" style={{ boxShadow: `0 30px 80px -20px ${MT.teal}55` }}>
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden rounded-md bg-white/5 px-3 py-1 text-xs text-text-muted sm:block">Martly admin</span>
      </div>
      <img key={src} src={src} alt={alt} loading="lazy" className="runq-fade-up aspect-[16/10] w-full object-cover object-top" />
    </div>
  )
}

function Extras() {
  return (
    <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {platformExtras.map((item) => (
        <li key={item} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-bg-card/40 px-4 py-3 text-sm text-text-primary">
          <Check size={15} className="shrink-0" style={{ color: MT.amber }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** The store-owner side: a tabbed tour of the Martly admin panel. */
function MartlyPlatform() {
  const [activeId, setActiveId] = useState(platformTabs[0].id)
  const active = platformTabs.find((t) => t.id === activeId) ?? platformTabs[0]

  return (
    <section id="for-stores" className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: MT.amber }}>
            For store owners
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Take your store online — without building anything.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Martly gives grocery stores and chains their own delivery business: a ready catalog, an
            admin panel, rider tools and a customer app, all working together.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2" role="tablist">
          {platformTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeId}
              onClick={() => setActiveId(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab.id === activeId ? "text-white" : "border border-white/10 text-text-secondary hover:text-text-primary"
              }`}
              style={tab.id === activeId ? { backgroundColor: MT.teal } : undefined}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <BrowserFrame src={active.image} alt={`Martly admin — ${active.label}`} />
          <div className="mt-6 text-center">
            <h3 className="font-heading text-xl font-semibold text-text-primary">{active.title}</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">{active.body}</p>
          </div>
        </div>

        <Extras />
      </div>
    </section>
  )
}

export { MartlyPlatform }
