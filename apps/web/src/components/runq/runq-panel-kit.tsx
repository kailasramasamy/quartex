import type { LucideIcon } from "lucide-react"

/** Shared light "product surface" tokens + primitives so every runQ spotlight
 *  panel reads as one system. Figures shown in panels are illustrative. */
export const L = {
  panel: "#FBFBFD",
  header: "#FFFFFF",
  tile: "#F7F8FA",
  border: "#ECEEF2",
  borderOuter: "#E5E7EB",
  ink: "#0F172A",
  muted: "#64748B",
}

export const ACCENT = {
  indigo: "#6366F1",
  pos: "#16A34A",
  neg: "#EF4444",
  warn: "#B45309",
} as const

export function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
      style={{ backgroundColor: `${tone}1a`, color: tone }}
    >
      {label}
    </span>
  )
}

/** Consistent light card frame with an icon + title header and a right-side badge. */
export function PanelShell({
  icon: Icon,
  title,
  badge,
  children,
}: {
  icon: LucideIcon
  title: string
  badge?: { label: string; tone: string }
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-2xl"
      style={{ borderColor: L.borderOuter, backgroundColor: L.panel }}
    >
      <div
        className="flex items-center justify-between border-b px-5 py-3.5"
        style={{ borderColor: L.border, backgroundColor: L.header }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ACCENT.indigo}1f` }}
          >
            <Icon size={15} style={{ color: ACCENT.indigo }} />
          </span>
          <p className="font-heading text-sm font-bold" style={{ color: L.ink }}>
            {title}
          </p>
        </div>
        {badge && <Badge label={badge.label} tone={badge.tone} />}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
