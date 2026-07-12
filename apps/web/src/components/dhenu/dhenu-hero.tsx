import type { Product } from "@quartex/shared"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "~/components/button"
import { DhenuMesh } from "./dhenu-mesh"
import { PhoneFrame } from "./phone-frame"
import { DH } from "./dhenu-data"

function BetaBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-text-secondary backdrop-blur">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: DH.greenLight }} />
      In pilot with dairy SMEs
    </span>
  )
}

function DhenuHero({ product }: { product: Product }) {
  return (
    <section className="relative isolate overflow-hidden">
      <DhenuMesh />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pt-32">
        <div className="text-center lg:text-left">
          <div className="runq-fade-up flex justify-center lg:justify-start" style={{ animationDelay: "0ms" }}>
            <BetaBadge />
          </div>
          <div className="runq-fade-up mt-6 flex items-center justify-center gap-3 lg:justify-start" style={{ animationDelay: "60ms" }}>
            {product.appIcon && <img src={product.appIcon} alt="Dhenu" className="h-9 w-auto" />}
            <span className="font-heading text-2xl font-bold text-text-primary">Dhenu</span>
          </div>
          <h1
            className="runq-fade-up mt-6 font-heading text-4xl font-bold leading-[1.06] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Run your whole{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(100deg, ${DH.greenLight}, ${DH.green} 60%, ${DH.gold})` }}
            >
              milk network
            </span>{" "}
            from one phone.
          </h1>
          <p
            className="runq-fade-up mx-auto mt-6 max-w-lg text-lg leading-relaxed text-text-secondary lg:mx-0"
            style={{ animationDelay: "180ms" }}
          >
            Collection, quality-based pricing, dispatch and farmer payouts — from the
            village pour to the processing plant. Built for dairy SMEs.
          </p>
          <div
            className="runq-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <a href="/contact">
              <Button size="lg" className="group" style={{ backgroundColor: DH.green }}>
                Bring Dhenu to your dairy
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
            <a href="#how">
              <Button size="lg" variant="secondary">
                <Sparkles size={18} />
                See how it works
              </Button>
            </a>
          </div>
        </div>
        <div className="runq-fade-up flex justify-center lg:justify-end" style={{ animationDelay: "160ms" }}>
          <PhoneFrame src="/screenshots/dhenu/farmer-home.png" alt="Dhenu farmer home screen" />
        </div>
      </div>
    </section>
  )
}

export { DhenuHero }
