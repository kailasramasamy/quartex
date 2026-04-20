import type { Product } from "@quartex/shared"
import { Button } from "~/components/button"
import { Apple, Play } from "lucide-react"

const statusConfig = {
  live: { label: "Live", className: "bg-emerald-500/15 text-emerald-400" },
  beta: { label: "Beta", className: "bg-amber-500/15 text-amber-400" },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-bg-secondary text-text-muted",
  },
} satisfies Record<Product["status"], { label: string; className: string }>

function StatusBadge({ status }: { status: Product["status"] }) {
  const { label, className } = statusConfig[status]
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}

function DownloadLinks({ product }: { product: Product }) {
  const links = product.links
  if (!links) return null

  const hasAppStore = !!links.appStore
  const hasPlayStore = links.playStore && links.playStore !== "coming-soon"
  const playStoreComingSoon = links.playStore === "coming-soon"

  if (!hasAppStore && !hasPlayStore && !playStoreComingSoon) return null

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      {hasAppStore && (
        <a
          href={links.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Apple size={24} />
          <div className="text-left">
            <div className="text-[10px] leading-tight">Download on the</div>
            <div className="text-base font-semibold leading-tight">App Store</div>
          </div>
        </a>
      )}
      {hasPlayStore ? (
        <a
          href={links.playStore as string}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Play size={24} fill="currentColor" />
          <div className="text-left">
            <div className="text-[10px] leading-tight">Get it on</div>
            <div className="text-base font-semibold leading-tight">Google Play</div>
          </div>
        </a>
      ) : playStoreComingSoon ? (
        <div className="inline-flex items-center gap-3 bg-white/10 text-text-secondary px-6 py-3.5 rounded-xl border border-border cursor-default">
          <Play size={24} />
          <div className="text-left">
            <div className="text-[10px] leading-tight">Coming soon on</div>
            <div className="text-base font-semibold leading-tight">Google Play</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function DefaultCTA({ product }: { product: Product }) {
  const webLink = product.links?.web
  const isBeta = product.status === "beta"

  return (
    <div className="mt-8">
      {webLink ? (
        <a href={webLink} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Explore {product.name}</Button>
        </a>
      ) : (
        <Button size="lg">{isBeta ? "Join Beta" : "Get Started"}</Button>
      )}
    </div>
  )
}

function ProductHero({ product }: { product: Product }) {
  const hasAppLinks = product.links && (product.links.appStore || product.links.playStore)

  return (
    <section
      className="relative flex min-h-[60vh] items-center"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${product.color}18 0%, transparent 70%)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {product.appIcon && (
            <div className="mb-6 flex justify-center">
              <img
                src={product.appIcon}
                alt={`${product.name} icon`}
                className="w-20 h-20 rounded-2xl shadow-lg"
              />
            </div>
          )}
          <div className="mb-4">
            <StatusBadge status={product.status} />
          </div>
          <h1 className="font-heading text-5xl font-bold text-text-primary">
            {product.name}
          </h1>
          <p className="mt-4 text-xl text-text-secondary">{product.tagline}</p>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            {product.description}
          </p>
          {hasAppLinks ? (
            <DownloadLinks product={product} />
          ) : (
            <DefaultCTA product={product} />
          )}
        </div>
      </div>
    </section>
  )
}

export { ProductHero }
export type { ProductHeroProps }
interface ProductHeroProps {
  product: Product
}
