import type { Product } from "../types/product.js"

export const products: Product[] = [
  {
    id: "martly",
    name: "Martly",
    slug: "martly",
    tagline: "Hyperlocal grocery delivery, simplified",
    description:
      "A full-stack grocery delivery platform built for Vrindavan. Customer app, delivery tracking, inventory management, and real-time order processing — all in one system.",
    features: [
      {
        icon: "ShoppingCart",
        title: "Smart Ordering",
        description:
          "Intuitive product browsing with category filters, search, and cart management",
      },
      {
        icon: "Truck",
        title: "Live Delivery Tracking",
        description:
          "Real-time GPS tracking for customers and delivery partners",
      },
      {
        icon: "Package",
        title: "Inventory Management",
        description:
          "Stock tracking, low-stock alerts, and supplier coordination",
      },
      {
        icon: "BarChart3",
        title: "Analytics Dashboard",
        description:
          "Sales trends, delivery metrics, and customer insights at a glance",
      },
    ],
    color: "#10B981",
    iconName: "ShoppingBag",
    status: "live",
  },
  {
    id: "runq",
    name: "runQ",
    slug: "runq",
    tagline: "Finance & operations platform for Indian SMEs",
    description:
      "Invoicing, bills, banking, GST filing and real-time books in one platform — with AI bill capture and automatic bank reconciliation. Works alongside Tally: runQ for daily operations, Tally for CA compliance.",
    features: [
      {
        icon: "FileText",
        title: "Invoicing & Billing",
        description:
          "GST-aware sales invoices, purchase bills, AI extraction from PDFs, 3-way matching, and bulk import",
      },
      {
        icon: "Landmark",
        title: "Banking & Reconciliation",
        description:
          "Multi-bank dashboard, statement import, AI-powered auto-categorization, and payment gateway reconciliation",
      },
      {
        icon: "Brain",
        title: "AI Finance Agent",
        description:
          "Chat with AI about your finances — ask about cash flow, overdue invoices, vendor payments, and more",
      },
      {
        icon: "Receipt",
        title: "GST Compliance",
        description:
          "GSTR-1/3B filing, GSTR-2B reconciliation, ITC tracking, and GSTIN validation via GSP",
      },
      {
        icon: "BarChart3",
        title: "Reports & Analytics",
        description:
          "P&L, Balance Sheet, Cash Flow, expense analytics, revenue analytics, and period comparisons",
      },
      {
        icon: "Settings",
        title: "Workflows & Approvals",
        description:
          "Multi-level approvals, vendor management, fixed assets, dunning, and CA portal access",
      },
    ],
    color: "#6366F1",
    iconName: "Zap",
    status: "live",
    appIcon: "/screenshots/runq/logo.png",
    links: {
      web: "https://www.runq.in",
    },
  },
  {
    id: "renewd",
    name: "Renewd",
    slug: "renewd",
    tagline: "AI-powered renewal and subscription tracker",
    description:
      "Renewd tracks all your subscriptions, insurance policies, memberships, and recurring payments in one place. Scan any document — AI extracts renewal details automatically. Get smart reminders, chat with AI about your renewals, and store documents securely in an encrypted vault.",
    features: [
      {
        icon: "Brain",
        title: "AI Chat Assistant",
        description:
          "Ask questions about your renewals in natural language — upcoming dues, spending breakdown, and more",
      },
      {
        icon: "Scan",
        title: "Smart Document Scanning",
        description:
          "Scan or upload invoices, policies, and receipts — AI extracts renewal details automatically",
      },
      {
        icon: "LayoutDashboard",
        title: "Dashboard Overview",
        description:
          "See overdue, active, and upcoming renewals at a glance with total monthly spend",
      },
      {
        icon: "FolderLock",
        title: "Encrypted Vault",
        description:
          "AES-256 encrypted document storage — safely keep policies, invoices, and receipts",
      },
      {
        icon: "Bell",
        title: "Smart Reminders",
        description:
          "Timely notifications based on urgency — overdue, due this week, due this month",
      },
      {
        icon: "Tags",
        title: "Categories & Search",
        description:
          "Organize by insurance, subscription, membership — search and filter across all renewals",
      },
    ],
    color: "#8B5CF6",
    iconName: "RefreshCw",
    status: "live",
    appIcon: "/screenshots/renewd/app-icon.png",
    links: {
      appStore: "https://apps.apple.com/us/app/renewd/id6761368622",
      playStore: "coming-soon",
    },
  },
]
