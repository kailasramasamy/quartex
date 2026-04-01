import type { Product } from "@quartex/shared"
import { Button } from "~/components/button"

const statusConfig = {
  live: { label: "Live", className: "bg-emerald-500/15 text-emerald-400" },
  beta: { label: "Beta", className: "bg-amber-500/15 text-amber-400" },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-bg-secondary text-text-muted",
  },
} satisfies Record<Product["status"], { label: string; className: string }>

interface ProductHeroProps {
  product: Product
}

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

function ProductHero({ product }: ProductHeroProps) {
  const isBeta = product.status === "beta"

  return (
    <section
      className="relative flex min-h-[60vh] items-center"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${product.color}18 0%, transparent 70%)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
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
          <div className="mt-8">
            <Button size="lg">{isBeta ? "Join Beta" : "Get Started"}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ProductHero }
export type { ProductHeroProps }
