import type { Product } from "@quartex/shared"
import { ArrowRight, Smartphone } from "lucide-react"
import { Button } from "~/components/button"
import { PhoneFrame } from "~/components/dhenu/phone-frame"
import { MartlyMesh } from "./martly-mesh"
import { MT } from "./martly-data"

/** The amber smile from the Martly logo, drawn under a headline word. */
function Smile() {
  return (
    <svg viewBox="0 0 200 24" className="absolute -bottom-3 left-0 h-4 w-full" preserveAspectRatio="none" aria-hidden>
      <path d="M4 6 Q100 30 196 6" fill="none" stroke={MT.amber} strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function AppStoreSoon() {
  return (
    <span className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 text-left backdrop-blur">
      <Smartphone size={20} className="text-text-secondary" />
      <span className="leading-tight">
        <span className="block text-[11px] uppercase tracking-wider text-text-muted">Coming soon on the</span>
        <span className="block text-sm font-semibold text-text-primary">App Store</span>
      </span>
    </span>
  )
}

function PhoneStack() {
  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[520px] sm:h-[600px]">
      <div className="absolute left-0 top-20 hidden w-[220px] -rotate-6 opacity-80 sm:block">
        <PhoneFrame src="/screenshots/martly/categories.webp" alt="Martly categories" glow={false} />
      </div>
      <div className="absolute right-0 top-20 hidden w-[220px] rotate-6 opacity-80 sm:block">
        <PhoneFrame src="/screenshots/martly/product.webp" alt="Martly product page" glow={false} />
      </div>
      <div className="absolute inset-x-0 top-0 flex justify-center" style={{ animation: "runq-float 7s ease-in-out infinite" }}>
        <PhoneFrame src="/screenshots/martly/home.webp" alt="Martly home screen" glowColor={MT.teal} className="w-[260px]" />
      </div>
    </div>
  )
}

function MartlyHero({ product }: { product: Product }) {
  return (
    <section className="relative isolate overflow-hidden">
      <MartlyMesh />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pt-32">
        <div className="text-center lg:text-left">
          <div className="runq-fade-up flex items-center justify-center gap-3 lg:justify-start" style={{ animationDelay: "0ms" }}>
            {product.appIcon && (
              <img src={product.appIcon} alt="Martly app icon" className="h-12 w-12 rounded-2xl shadow-lg ring-1 ring-white/10" />
            )}
            <span className="text-left leading-tight">
              <span className="block font-heading text-2xl font-bold text-text-primary">Martly</span>
              <span className="block text-xs text-text-secondary">Groceries from stores near you</span>
            </span>
          </div>
          <h1
            className="runq-fade-up mt-7 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Your neighbourhood stores, delivered in{" "}
            <span className="relative inline-block" style={{ color: MT.tealLight }}>
              minutes
              <Smile />
            </span>
            .
          </h1>
          <p
            className="runq-fade-up mx-auto mt-7 max-w-lg text-lg leading-relaxed text-text-secondary lg:mx-0"
            style={{ animationDelay: "160ms" }}
          >
            Martly brings 1,300+ groceries and daily essentials from trusted local stores to your
            phone — with fast delivery, store pickup and Mart Plus savings on every order.
          </p>
          <div
            className="runq-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <AppStoreSoon />
            <a href="#for-stores">
              <Button size="lg" className="group" style={{ backgroundColor: MT.teal }}>
                Bring Martly to your store
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          </div>
        </div>
        <div className="runq-fade-up" style={{ animationDelay: "200ms" }}>
          <PhoneStack />
        </div>
      </div>
    </section>
  )
}

export { MartlyHero }
