import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "~/components/button"
import { MartlyMesh } from "./martly-mesh"
import { trust, MT } from "./martly-data"

function TrustRow() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      {trust.map((t) => (
        <span key={t.label} className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary">
          <t.icon size={15} style={{ color: MT.tealLight }} />
          {t.label}
        </span>
      ))}
    </div>
  )
}

function MartlyCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/5">
      <MartlyMesh grid={false} />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-28">
        <TrustRow />
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Run a grocery store? Let's put it on{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(100deg, ${MT.tealLight}, ${MT.amber})` }}>
            Martly
          </span>
          .
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
          We set up your catalog, prices, delivery zones and riders, so your customers can order from
          you in days, not months.
        </p>
        <div className="mt-9 flex justify-center">
          <a href="/contact">
            <Button size="lg" className="group" style={{ backgroundColor: MT.teal }}>
              Talk to us
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </a>
        </div>
        <p className="mt-10 text-xs text-text-muted">
          <Link to="/products/martly/support" className="hover:text-text-secondary">Support</Link>
          {" · "}
          <Link to="/products/martly/privacy" className="hover:text-text-secondary">Privacy Policy</Link>
          {" · "}
          <Link to="/products/martly/terms" className="hover:text-text-secondary">Terms of Use</Link>
        </p>
      </div>
    </section>
  )
}

export { MartlyCta }
