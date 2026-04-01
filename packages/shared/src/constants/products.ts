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
    tagline: "AI-powered renewal tracking",
    description:
      "Never miss a renewal again. Renewd uses AI to track subscriptions, contracts, and recurring payments — sending smart reminders before deadlines hit.",
    features: [
      {
        icon: "Bell",
        title: "Smart Reminders",
        description:
          "AI-timed notifications based on renewal urgency and history",
      },
      {
        icon: "Calendar",
        title: "Renewal Calendar",
        description:
          "Visual timeline of all upcoming renewals across categories",
      },
      {
        icon: "Brain",
        title: "AI Categorization",
        description:
          "Automatic categorization and priority scoring of renewals",
      },
      {
        icon: "Shield",
        title: "Never Miss a Deadline",
        description:
          "Escalation chains and backup reminders for critical renewals",
      },
    ],
    color: "#8B5CF6",
    iconName: "RefreshCw",
    status: "beta",
  },
]
