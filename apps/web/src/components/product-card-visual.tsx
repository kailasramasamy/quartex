import type { Product } from "@quartex/shared"
import { RunqDashboardMock } from "~/components/runq/runq-dashboard-mock"

/** Three real app screens per mobile product, back-left, front-centre, back-right. */
const PHONE_SCREENS: Record<string, [string, string, string]> = {
  martly: ["/screenshots/martly/categories.webp", "/screenshots/martly/home.webp", "/screenshots/martly/product.webp"],
  dhenu: ["/screenshots/dhenu/thumb-cc-home.webp", "/screenshots/dhenu/thumb-farmer-home.webp", "/screenshots/dhenu/thumb-vmcc-home.webp"],
  renewd: ["/screenshots/renewd/thumb-ai-chat.webp", "/screenshots/renewd/thumb-home-dashboard.webp", "/screenshots/renewd/thumb-vault.webp"],
}

function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`absolute rounded-[1.6rem] border border-white/12 bg-[#0b0f16] p-1.5 shadow-2xl transition-transform duration-500 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-[1.25rem]" />
    </div>
  )
}

function PhoneFan({ product, screens }: { product: Product; screens: [string, string, string] }) {
  const [left, centre, right] = screens
  return (
    <>
      <Phone
        src={left}
        alt={`${product.name} screen`}
        className="left-[12%] top-14 w-[30%] -rotate-[8deg] opacity-80 group-hover:-translate-x-2 group-hover:-translate-y-1"
      />
      <Phone
        src={right}
        alt={`${product.name} screen`}
        className="right-[12%] top-14 w-[30%] rotate-[8deg] opacity-80 group-hover:translate-x-2 group-hover:-translate-y-1"
      />
      <Phone
        src={centre}
        alt={`${product.name} home screen`}
        className="left-1/2 top-7 z-10 w-[36%] -translate-x-1/2 group-hover:-translate-y-2"
      />
    </>
  )
}

function DashboardPeek() {
  return (
    <div className="absolute left-1/2 top-8 w-[150%] origin-top -translate-x-1/2 scale-[0.62] transition-transform duration-500 group-hover:-translate-y-2">
      <RunqDashboardMock />
    </div>
  )
}

/** The image panel at the top of a product card: real screens on a glow of the product colour. */
function ProductCardVisual({ product }: { product: Product }) {
  const screens = PHONE_SCREENS[product.slug]
  return (
    <div className="relative h-72 overflow-hidden rounded-t-2xl border-b border-white/5 sm:h-80" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${product.color}55 0%, ${product.color}14 55%, transparent 80%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {screens ? <PhoneFan product={product} screens={screens} /> : <DashboardPeek />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-bg-card to-transparent" />
    </div>
  )
}

export { ProductCardVisual }
