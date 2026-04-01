import type { LucideProps } from "lucide-react"

type IconComponent = React.ComponentType<LucideProps>
type BadgeSize = "sm" | "md" | "lg"

interface IconBadgeProps {
  icon: IconComponent
  color: string
  size?: BadgeSize
}

const sizeMap: Record<BadgeSize, { container: string; icon: number }> = {
  sm: { container: "w-8 h-8 rounded-lg", icon: 16 },
  md: { container: "w-12 h-12 rounded-xl", icon: 22 },
  lg: { container: "w-16 h-16 rounded-2xl", icon: 28 },
}

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "")
  const r = parseInt(cleaned.slice(0, 2), 16)
  const g = parseInt(cleaned.slice(2, 4), 16)
  const b = parseInt(cleaned.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function IconBadge({ icon: Icon, color, size = "md" }: IconBadgeProps) {
  const { container, icon: iconSize } = sizeMap[size]

  return (
    <div
      className={`inline-flex items-center justify-center ${container}`}
      style={{ backgroundColor: hexToRgba(color, 0.15) }}
    >
      <Icon size={iconSize} style={{ color }} />
    </div>
  )
}

export { IconBadge }
export type { IconBadgeProps }
