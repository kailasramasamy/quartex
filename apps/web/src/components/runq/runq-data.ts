import type { LucideIcon } from "lucide-react"
import {
  FileText,
  ScanLine,
  Landmark,
  BadgePercent,
  BookOpen,
  BarChart3,
  Boxes,
  ShoppingCart,
  Users,
  Factory,
  Building2,
  ShieldCheck,
  ScrollText,
  Smartphone,
  UserCog,
} from "lucide-react"

/** runQ brand palette — indigo core with violet/cyan for gradient meshes. */
export const RUNQ = {
  indigo: "#6366F1",
  indigoLight: "#818CF8",
  indigoDeep: "#4F46E5",
  violet: "#8B5CF6",
  cyan: "#38BDF8",
} as const

export interface RunqModule {
  icon: LucideIcon
  title: string
  blurb: string
  tag?: string
}

/** The full module surface — every item is shipped today (Manufacturing is newest). */
export const runqModules: RunqModule[] = [
  { icon: FileText, title: "Receivables", blurb: "Invoices, receipts, collections, dunning" },
  { icon: ScanLine, title: "Payables", blurb: "Bills, AI scan, pay runs, NEFT exports" },
  { icon: Landmark, title: "Banking", blurb: "Accounts, statement import, reconciliation" },
  { icon: BadgePercent, title: "GST", blurb: "GSTR-1, 3B & 2B — filed via licensed GSP" },
  { icon: BookOpen, title: "Accounting", blurb: "Real double-entry ledger & journals" },
  { icon: BarChart3, title: "Reports", blurb: "P&L, Balance Sheet, live dashboards" },
  { icon: Boxes, title: "Inventory", blurb: "Stock, batches, expiry, FEFO" },
  { icon: ShoppingCart, title: "Purchase", blurb: "POs, scan-receive, vendor management" },
  { icon: Users, title: "HR & Payroll", blurb: "Payroll, PF/ESI/PT, Form 16" },
  { icon: Factory, title: "Manufacturing", blurb: "BOMs, work orders, job costing", tag: "New" },
]

export type RunqPanelKind = "billscan" | "gst" | "banking" | "dashboard"

export interface RunqSpotlight {
  icon: LucideIcon
  kicker: string
  title: string
  body: string
  chips: string[]
  /** Which coded light product panel to render alongside the copy. */
  panel: RunqPanelKind
}

/** Four deep-dives on the strongest, fully-shipped capabilities. */
export const runqSpotlights: RunqSpotlight[] = [
  {
    icon: ScanLine,
    kicker: "Accounts Payable",
    title: "Snap a bill. It's booked.",
    body: "Photograph or upload a vendor bill — runQ reads it, matches the vendor, and drafts a GST-ready entry for your approval.",
    chips: ["Camera & PDF capture", "AI extraction", "Vendor auto-match", "Duplicate & 3-way match"],
    panel: "billscan",
  },
  {
    icon: BadgePercent,
    kicker: "GST Compliance",
    title: "File GST without leaving runQ.",
    body: "Generate GSTR-1 and GSTR-3B straight from your books, reconcile GSTR-2B for input tax credit, and file through a licensed GSP.",
    chips: ["GSTR-1 & 3B", "2B reconciliation & ITC", "Filed via licensed GSP", "HSN & readiness checks"],
    panel: "gst",
  },
  {
    icon: Landmark,
    kicker: "Banking",
    title: "Import a statement. Watch it reconcile.",
    body: "Bring in Excel, CSV or PDF statements — runQ auto-matches receipts, bills and TDS, then posts whatever's left.",
    chips: ["Excel / CSV / PDF import", "Smart auto-reconcile", "TDS & narration matching", "Per-account reports"],
    panel: "banking",
  },
  {
    icon: BookOpen,
    kicker: "Accounting",
    title: "Every entry, already in your books.",
    body: "AR, AP, banking, payroll and inventory post to a real double-entry ledger — so your statements are always current.",
    chips: ["Auto-posted journals", "P&L · Balance Sheet · Trial Balance", "Cash flow & forecast", "CSV export for your CA"],
    panel: "dashboard",
  },
]

export interface RunqBeyond {
  icon: LucideIcon
  title: string
  body: string
  tag?: string
}

/** runQ is a full ERP, not only finance — these are also shipped. */
export const runqBeyond: RunqBeyond[] = [
  {
    icon: Users,
    title: "HR & Payroll",
    body: "Run payroll with PF, ESI and PT challans, ECR exports, and TDS Form 24Q / Form 16.",
  },
  {
    icon: Boxes,
    title: "Inventory",
    body: "Track stock with batches, expiry and FEFO across warehouses, with GRN capture on receipt.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    body: "BOMs, work orders, FEFO consumption and job costing with yield variance.",
    tag: "New",
  },
]

export interface RunqPlatformItem {
  icon: LucideIcon
  label: string
}

export const runqPlatform: RunqPlatformItem[] = [
  { icon: Building2, label: "Multi-business, multi-tenant" },
  { icon: ShieldCheck, label: "Roles & per-user module access" },
  { icon: UserCog, label: "CA / accountant portal" },
  { icon: ScrollText, label: "Full audit trail" },
  { icon: Smartphone, label: "Native mobile app" },
]
