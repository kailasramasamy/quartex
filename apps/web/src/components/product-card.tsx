import { Link } from "@tanstack/react-router"
import { ShoppingBag, Zap, RefreshCw, type LucideIcon } from "lucide-react"
import type { Product } from "@quartex/shared"

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  Zap,
  RefreshCw,
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

function ProductIconBadge({
  iconName,
  color,
}: {
  iconName: string
  color: string
}) {
  const Icon = iconMap[iconName] ?? ShoppingBag
  return (
    <div
      className="mb-5 inline-flex rounded-xl p-3"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon size={24} style={{ color }} />
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
      <ProductIconBadge iconName={product.iconName} color={product.color} />
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {product.name}
        </h3>
        <StatusBadge status={product.status} />
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">
        {product.tagline}
      </p>
    </Link>
  )
}

export { ProductCard }
export type { ProductCardProps }
