import { Check } from "lucide-react"
import { spotlights, type DhenuSpotlight, DH } from "./dhenu-data"
import { PhoneFrame } from "./phone-frame"

function Chips({ chips }: { chips: string[] }) {
  return (
    <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
      {chips.map((c) => (
        <li key={c} className="flex items-center gap-2.5 text-sm text-text-secondary">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: `${DH.green}26` }}>
            <Check size={13} style={{ color: DH.greenLight }} />
          </span>
          {c}
        </li>
      ))}
    </ul>
  )
}

function SpotlightRow({ item, index }: { item: DhenuSpotlight; index: number }) {
  const reverse = index % 2 === 1
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: DH.greenLight }}>
          {item.kicker}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">{item.body}</p>
        <Chips chips={item.chips} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <PhoneFrame src={item.image} alt={item.title} />
      </div>
    </div>
  )
}

function DhenuSpotlights() {
  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-12 sm:px-6 lg:px-8">
        {spotlights.map((item, i) => (
          <SpotlightRow key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

export { DhenuSpotlights }
