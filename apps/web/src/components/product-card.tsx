import { Link } from "@tanstack/react-router"
import { ShoppingBag, Zap, RefreshCw, Milk, type LucideIcon } from "lucide-react"
import type { Product } from "@quartex/shared"

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

// Real app icons where we have them; others fall back to a tinted lucide badge.
const appIcons: Record<string, string> = {
  runq: "/screenshots/runq/app-icon.png",
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
        className="mb-5 h-12 w-12 rounded-2xl shadow-lg ring-1 ring-white/10"
      />
    )
  }
  const Icon = iconMap[product.iconName] ?? ShoppingBag
  return (
    <div
      className="mb-5 inline-flex rounded-2xl p-3"
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
      className="group block rounded-2xl border border-border bg-bg-card p-6 transition-all duration-200 hover:border-accent hover:shadow-lg hover:shadow-accent/5"
    >
      <ProductIconBadge product={product} />
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {product.name}
        </h3>
        <StatusBadge status={product.status} />
      </div>
      <p className="text-base leading-relaxed text-text-secondary">
        {product.tagline}
      </p>
    </Link>
  )
}

export { ProductCard }
export type { ProductCardProps }
