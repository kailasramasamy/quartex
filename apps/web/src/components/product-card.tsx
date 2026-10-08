import { Link } from "@tanstack/react-router"
import { ArrowRight, ShoppingBag, Zap, RefreshCw, Milk, type LucideIcon } from "lucide-react"
import type { Product } from "@quartex/shared"
import { ProductCardVisual } from "~/components/product-card-visual"

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  Zap,
  RefreshCw,
  Milk,
}

const statusConfig = {
  live: { label: "Live", className: "bg-emerald-500/15 text-emerald-400" },
  beta: { label: "Beta", className: "bg-amber-500/15 text-amber-400" },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-bg-secondary text-text-muted",
  },
} satisfies Record<Product["status"], { label: string; className: string }>

interface ProductCardProps {
  product: Product
}

// Square app icons (product.appIcon can be a wide logo, e.g. runQ's).
const appIcons: Record<string, string> = {
  runq: "/screenshots/runq/app-icon.png",
  martly: "/screenshots/martly/app-icon.png",
  dhenu: "/screenshots/dhenu/app-icon.png",
  renewd: "/screenshots/renewd/app-icon.png",
}

function ProductIconBadge({ product }: { product: Product }) {
  const appIcon = appIcons[product.slug]
  if (appIcon) {
    return (
      <img
        src={appIcon}
        alt={`${product.name} app icon`}
        className="h-12 w-12 shrink-0 rounded-2xl shadow-lg ring-1 ring-white/10"
      />
    )
  }
  const Icon = iconMap[product.iconName] ?? ShoppingBag
  return (
    <div
      className="inline-flex shrink-0 rounded-2xl p-3"
      style={{ backgroundColor: `${product.color}20` }}
    >
      <Icon size={24} style={{ color: product.color }} />
    </div>
  )
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const { label, className } = statusConfig[status]
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
      style={{ boxShadow: `0 24px 60px -30px ${product.color}66` }}
    >
      <ProductCardVisual product={product} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4">
          <ProductIconBadge product={product} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <h3 className="font-heading text-xl font-semibold text-text-primary">{product.name}</h3>
              <StatusBadge status={product.status} />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">{product.tagline}</p>
          </div>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
          Explore {product.name}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: product.color }} />
        </span>
      </div>
    </Link>
  )
}

export { ProductCard }
export type { ProductCardProps }
