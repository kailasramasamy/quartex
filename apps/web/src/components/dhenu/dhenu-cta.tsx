import { ArrowRight, BookOpen, ShieldCheck, Smartphone } from "lucide-react"
import { Button } from "~/components/button"
import { DhenuMesh } from "./dhenu-mesh"
import { DH } from "./dhenu-data"

const trust = [
  { icon: BookOpen, label: "Posts to real double-entry books" },
  { icon: ShieldCheck, label: "Secure phone-OTP login" },
  { icon: Smartphone, label: "Works offline in the field" },
]

function DhenuCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/5">
      <DhenuMesh grid={false} />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-28">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trust.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary">
              <t.icon size={15} style={{ color: DH.greenLight }} />
              {t.label}
            </span>
          ))}
        </div>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Bring{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(100deg, ${DH.greenLight}, ${DH.gold})` }}
          >
            Dhenu
          </span>{" "}
          to your dairy.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
          Digitise collection, pricing, dispatch and payouts across your whole milk
          network. We'll set up your centres and onboard your farmers.
        </p>
        <div className="mt-9 flex justify-center">
          <a href="/contact">
            <Button size="lg" className="group" style={{ backgroundColor: DH.green }}>
              Talk to us
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export { DhenuCta }
