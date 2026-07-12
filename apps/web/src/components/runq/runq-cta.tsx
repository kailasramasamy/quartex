import type { Product } from "@quartex/shared"
import { ArrowRight } from "lucide-react"
import { Button } from "~/components/button"
import { RunqMesh } from "./runq-mesh"
import { RUNQ } from "./runq-data"

function RunqCta({ product }: { product: Product }) {
  const web = product.links?.web
  return (
    <section className="relative isolate overflow-hidden border-t border-white/5">
      <RunqMesh grid={false} />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Run your finances the{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(100deg, ${RUNQ.indigoLight}, ${RUNQ.cyan})` }}
          >
            modern way
          </span>
          .
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
          One login for invoicing, banking, GST and your books. Keep Tally for compliance — runQ
          handles the day-to-day.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                Explore runQ
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          )}
          <a href="/contact">
            <Button size="lg" variant="secondary">
              Talk to us
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export { RunqCta }
