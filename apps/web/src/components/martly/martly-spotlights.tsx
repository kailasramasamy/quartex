import { Check } from "lucide-react"
import { PhoneFrame } from "~/components/dhenu/phone-frame"
import { spotlights, type Spotlight, MT } from "./martly-data"

function Chips({ chips }: { chips: string[] }) {
  return (
    <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
      {chips.map((c) => (
        <li key={c} className="flex items-center gap-2.5 text-sm text-text-secondary">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: `${MT.teal}40` }}>
            <Check size={13} style={{ color: MT.tealLight }} />
          </span>
          {c}
        </li>
      ))}
    </ul>
  )
}

function SpotlightRow({ item, index }: { item: Spotlight; index: number }) {
  const reverse = index % 2 === 1
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: MT.tealLight }}>
          <item.icon size={16} />
          {item.kicker}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{item.title}</h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">{item.body}</p>
        <Chips chips={item.chips} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <PhoneFrame src={item.image} alt={item.title} glowColor={index % 3 === 2 ? MT.amber : MT.teal} />
      </div>
    </div>
  )
}

/** Alternating screenshot + story rows, one per customer-facing feature. */
function MartlySpotlights() {
  return (
    <section className="overflow-x-clip py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: MT.tealLight }}>
          For shoppers
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Everything you need from your local store.
        </h2>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-28 px-4 sm:px-6 lg:px-8">
        {spotlights.map((item, i) => (
          <SpotlightRow key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

export { MartlySpotlights }
