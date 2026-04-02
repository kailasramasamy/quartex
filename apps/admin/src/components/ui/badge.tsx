interface BadgeProps {
  label: string
  color: string
  size?: "sm" | "md"
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
}

function Badge({ label, color, size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]}`}
      style={{
        backgroundColor: hexToRgba(color, 0.15),
        color,
      }}
    >
      {label}
    </span>
  )
}

export { Badge }
export type { BadgeProps }
