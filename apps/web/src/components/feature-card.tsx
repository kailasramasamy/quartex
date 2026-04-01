import {
  ShoppingCart,
  Truck,
  Package,
  BarChart3,
  Warehouse,
  Route,
  Users,
  IndianRupee,
  Bell,
  Calendar,
  Brain,
  Shield,
  Circle,
  type LucideIcon,
} from "lucide-react"
import type { ProductFeature } from "@quartex/shared"

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Truck,
  Package,
  BarChart3,
  Warehouse,
  Route,
  Users,
  IndianRupee,
  Bell,
  Calendar,
  Brain,
  Shield,
}

interface FeatureCardProps {
  feature: ProductFeature
  color: string
}

function FeatureCard({ feature, color }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] ?? Circle

  return (
    <div
      className="relative rounded-xl border border-border bg-bg-card p-6 overflow-hidden"
      style={{ borderTopColor: color }}
    >
      <div
        className="mb-4 inline-flex rounded-lg p-2.5"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <h3 className="font-heading font-semibold text-text-primary">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {feature.description}
      </p>
    </div>
  )
}

export { FeatureCard }
export type { FeatureCardProps }
