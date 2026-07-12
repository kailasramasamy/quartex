import type { Product } from "@quartex/shared"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "~/components/button"
import { RunqMesh } from "./runq-mesh"
import { runqModules, RUNQ } from "./runq-data"

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-text-secondary backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Live · Operations finance for Indian SMEs
    </span>
  )
}

/** Softly floating ring of module icons under the hero copy. */
function IconConstellation() {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {runqModules.map((m, i) => (
        <div
          key={m.title}
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-colors hover:border-white/20"
          style={{ animation: `runq-float ${5 + (i % 4)}s ease-in-out ${i * 0.2}s infinite` }}
          title={m.title}
        >
          <m.icon size={20} style={{ color: RUNQ.indigoLight }} />
        </div>
      ))}
    </div>
  )
}

function RunqHero({ product }: { product: Product }) {
  const web = product.links?.web
  return (
    <section className="relative isolate overflow-hidden">
      <RunqMesh />
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-28 text-center sm:px-6 lg:px-8 lg:pt-36">
        <div className="runq-fade-up flex justify-center" style={{ animationDelay: "0ms" }}>
          <LiveBadge />
        </div>
        {product.appIcon && (
          <img
            src={product.appIcon}
            alt={product.name}
            className="runq-fade-up mx-auto mt-8 h-11 w-auto object-contain"
            style={{ animationDelay: "80ms" }}
          />
        )}
        <h1
          className="runq-fade-up mx-auto mt-8 max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl"
          style={{ animationDelay: "140ms" }}
        >
          One platform for everything
          <br className="hidden sm:block" /> your{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(100deg, ${RUNQ.indigoLight}, ${RUNQ.violet} 55%, ${RUNQ.cyan})` }}
          >
            money touches
          </span>
          .
        </h1>
        <p
          className="runq-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
          style={{ animationDelay: "200ms" }}
        >
          Invoicing, bills, banking, GST and your books — connected, automated,
          and built for how Indian SMEs actually run.
        </p>
        <div
          className="runq-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "260ms" }}
        >
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                Explore runQ
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          )}
          <a href="#modules">
            <Button size="lg" variant="secondary">
              <Sparkles size={18} />
              See the modules
            </Button>
          </a>
        </div>
        <IconConstellation />
      </div>
    </section>
  )
}

export { RunqHero }
