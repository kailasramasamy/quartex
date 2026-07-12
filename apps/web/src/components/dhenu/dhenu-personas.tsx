import { personas, DH } from "./dhenu-data"

/** One login resolves to the right role — farmer, VMCC, CC or plant. */
function DhenuPersonas() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: DH.greenLight }}>
            Four roles, one login
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            The whole network on the same app.
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Sign in with a phone number — Dhenu opens the right screen for who you are.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {personas.map((p) => (
            <div
              key={p.role}
              className="group rounded-2xl border border-white/8 bg-bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${DH.green}1f`, boxShadow: `inset 0 0 0 1px ${DH.green}2e` }}
              >
                <p.icon size={22} style={{ color: DH.greenLight }} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">{p.role}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{p.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { DhenuPersonas }
