import { TrendingUp, Wallet } from "lucide-react"
import { L, ACCENT } from "./runq-panel-kit"

/** Illustrative figures — a stylized, bold render of the real runQ dashboard
 *  (labels match the product: Cash position, Receivables, Payables, Cash flow
 *  forecast with In/Out bars). Not live data. */
const kpis = [
  { label: "Cash position", value: "₹18.4L", pill: "+4.2%", tone: ACCENT.pos },
  { label: "Receivables", value: "₹6.20L", pill: "3 overdue", tone: ACCENT.neg },
  { label: "Payables", value: "₹2.85L", pill: "Due in 7d", tone: ACCENT.warn },
]

const months = [
  { m: "Feb", inn: 58, out: 44 },
  { m: "Mar", inn: 72, out: 50 },
  { m: "Apr", inn: 64, out: 61 },
  { m: "May", inn: 83, out: 55 },
  { m: "Jun", inn: 70, out: 48, forecast: true },
  { m: "Jul", inn: 88, out: 52, forecast: true },
]

function KpiTile({ label, value, pill, tone }: { label: string; value: string; pill: string; tone: string }) {
  return (
    <div className="rounded-xl border p-3.5" style={{ borderColor: L.border, backgroundColor: L.tile }}>
      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: L.muted }}>
        {label}
      </p>
      <p className="mt-1.5 font-heading text-xl font-bold tabular-nums" style={{ color: L.ink }}>
        {value}
      </p>
      <span
        className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ backgroundColor: `${tone}1a`, color: tone }}
      >
        {pill}
      </span>
    </div>
  )
}

function Bar({ h, color, forecast }: { h: number; color: string; forecast?: boolean }) {
  return (
    <div
      className="w-2.5 rounded-t-[3px] sm:w-3"
      style={{
        height: `${h}%`,
        backgroundColor: forecast ? `${color}33` : color,
        border: forecast ? `1.5px dashed ${color}` : "none",
      }}
    />
  )
}

function ForecastChart() {
  return (
    <div className="mt-4 rounded-xl border p-4" style={{ borderColor: L.border, backgroundColor: L.header }}>
      <div className="flex items-center justify-between">
        <p className="font-heading text-sm font-bold" style={{ color: L.ink }}>
          Cash flow forecast
        </p>
        <div className="flex items-center gap-3 text-[10px] font-medium" style={{ color: L.muted }}>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT.pos }} /> In
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT.neg }} /> Out
          </span>
        </div>
      </div>
      <div className="mt-4 flex h-32 items-stretch gap-2">
        {months.map((mo) => (
          <div key={mo.m} className="flex flex-1 flex-col">
            <div className="flex flex-1 items-end justify-center gap-1">
              <Bar h={mo.inn} color={ACCENT.pos} forecast={mo.forecast} />
              <Bar h={mo.out} color={ACCENT.neg} forecast={mo.forecast} />
            </div>
            <span className="mt-1.5 text-center text-[10px] font-medium" style={{ color: L.muted }}>
              {mo.m}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Bold, screenshot-style render of the runQ finance dashboard. */
function RunqDashboardMock() {
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
            <Wallet size={15} style={{ color: ACCENT.indigo }} />
          </span>
          <div>
            <p className="text-[10px] font-medium" style={{ color: L.muted }}>
              Total cash
            </p>
            <p className="font-heading text-base font-bold leading-tight tabular-nums" style={{ color: L.ink }}>
              ₹24.6L
            </p>
          </div>
        </div>
        <span
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
          style={{ backgroundColor: `${ACCENT.pos}1a`, color: ACCENT.pos }}
        >
          <TrendingUp size={12} /> Healthy
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {kpis.map((k) => (
            <KpiTile key={k.label} {...k} />
          ))}
        </div>
        <ForecastChart />
      </div>
    </div>
  )
}

export { RunqDashboardMock }
