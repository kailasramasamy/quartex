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
    name: "RunQ",
    slug: "runq",
    tagline: "ERP for quick commerce operations",
    description:
      "Enterprise resource planning built for the speed of quick commerce. Warehouse management, route optimization, vendor coordination, and financial tracking — designed for sub-30-minute delivery operations.",
    features: [
      {
        icon: "Warehouse",
        title: "Warehouse Management",
        description:
          "Multi-warehouse support with bin-level tracking and pick-pack workflows",
      },
      {
        icon: "Route",
        title: "Route Optimization",
        description:
          "AI-powered delivery route planning for maximum efficiency",
      },
      {
        icon: "Users",
        title: "Vendor Portal",
        description:
          "Self-serve vendor onboarding, PO management, and payment tracking",
      },
      {
        icon: "IndianRupee",
        title: "Financial Module",
        description:
          "Invoicing, reconciliation, and P&L tracking per dark store",
      },
    ],
    color: "#F59E0B",
    iconName: "Zap",
    status: "beta",
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
    links: {
      appStore: "https://apps.apple.com/us/app/renewd/id6761368622",
      playStore: "coming-soon",
    },
  },
]
