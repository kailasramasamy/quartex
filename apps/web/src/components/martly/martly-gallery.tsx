import { PhoneFrame } from "~/components/dhenu/phone-frame"
import { gallery, MT } from "./martly-data"

/** A horizontally scrollable strip of every app screen. */
function MartlyGallery() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: MT.tealLight }}>
          Screen by screen
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          See the real app.
        </h2>
      </div>
      <div className="mt-12 flex snap-x gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8">
        {gallery.map((shot) => (
          <div key={shot.src} className="w-56 shrink-0 snap-center">
            <PhoneFrame src={shot.src} alt={shot.label} glow={false} className="max-w-[224px]" />
            <p className="mt-4 text-center text-xs font-medium text-text-secondary">{shot.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { MartlyGallery }
