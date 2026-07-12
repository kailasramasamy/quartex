import { ScanLine, BadgePercent, Landmark, Check, CircleAlert } from "lucide-react"
import { L, ACCENT, PanelShell } from "./runq-panel-kit"

/** ── Bill scan → extracted, ready to post ─────────────────────────── */
const billFields: [string, string, boolean?][] = [
  ["Vendor", "Sri Ram Traders"],
  ["Invoice #", "INV-2291"],
  ["Date", "12 Jul 2026"],
  ["GST (18%)", "₹6,454"],
  ["Total", "₹42,300", true],
]

function BillScanPanel() {
  return (
    <PanelShell icon={ScanLine} title="Bill scanned" badge={{ label: "Extracted", tone: ACCENT.pos }}>
      <div className="rounded-xl border p-1" style={{ borderColor: L.border, backgroundColor: L.tile }}>
        {billFields.map(([k, v, strong]) => (
          <div
            key={k}
            className="flex items-center justify-between px-3 py-2.5"
            style={{ borderTop: k === "Vendor" ? "none" : `1px solid ${L.border}` }}
          >
            <span className="text-xs" style={{ color: L.muted }}>{k}</span>
            <span
              className="tabular-nums"
              style={{ color: L.ink, fontWeight: strong ? 700 : 500, fontSize: strong ? 15 : 13 }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: ACCENT.pos }}>
          <Check size={14} /> Vendor matched
        </span>
        <span className="text-xs" style={{ color: L.muted }}>·</span>
        <span className="text-xs font-medium" style={{ color: ACCENT.indigo }}>Ready to post</span>
      </div>
    </PanelShell>
  )
}

/** ── GST readiness across returns ─────────────────────────────────── */
const returns: [string, string, string][] = [
  ["GSTR-1", "Filed", ACCENT.pos],
  ["GSTR-3B", "3 days left", ACCENT.warn],
  ["GSTR-2B", "Reconciled", ACCENT.pos],
]

function GstPanel() {
  return (
    <PanelShell icon={BadgePercent} title="GST readiness" badge={{ label: "92% ready", tone: ACCENT.pos }}>
      <div className="space-y-2.5">
        {returns.map(([name, status, tone]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-xl border px-3.5 py-3"
            style={{ borderColor: L.border, backgroundColor: L.tile }}
          >
            <span className="font-heading text-sm font-semibold" style={{ color: L.ink }}>{name}</span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: `${tone}1a`, color: tone }}
            >
              {tone === ACCENT.pos && <Check size={12} />}
              {status}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs" style={{ color: L.muted }}>
        ITC matched from 2B · <span style={{ color: L.ink, fontWeight: 600 }}>₹1.24L</span>
      </p>
    </PanelShell>
  )
}

/** ── Bank statement auto-reconciliation ───────────────────────────── */
const txns: [string, string, boolean][] = [
  ["UPI · Sri Ram Traders", "+₹42,300", true],
  ["NEFT · Monthly payroll", "−₹2,10,000", true],
  ["Cheque · 004821", "−₹18,500", true],
  ["IMPS · Unknown payer", "+₹9,000", false],
]

function BankingPanel() {
  return (
    <PanelShell icon={Landmark} title="HDFC ••4821" badge={{ label: "12 auto-matched", tone: ACCENT.pos }}>
      <div className="space-y-1">
        {txns.map(([desc, amt, matched]) => (
          <div key={desc} className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ backgroundColor: L.tile }}>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ backgroundColor: matched ? `${ACCENT.pos}1a` : `${ACCENT.warn}1a` }}
              >
                {matched ? (
                  <Check size={13} style={{ color: ACCENT.pos }} />
                ) : (
                  <CircleAlert size={13} style={{ color: ACCENT.warn }} />
                )}
              </span>
              <span className="text-xs" style={{ color: L.ink }}>{desc}</span>
            </div>
            <span className="text-xs font-semibold tabular-nums" style={{ color: amt.startsWith("+") ? ACCENT.pos : L.ink }}>
              {amt}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs" style={{ color: L.muted }}>
        <span style={{ color: ACCENT.warn, fontWeight: 600 }}>1</span> left to review
      </p>
    </PanelShell>
  )
}

export { BillScanPanel, GstPanel, BankingPanel }
