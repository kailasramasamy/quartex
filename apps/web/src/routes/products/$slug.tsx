import { createFileRoute, notFound } from "@tanstack/react-router"
import { products, buildMeta } from "@quartex/shared"
import { ProductHero } from "~/components/product-hero"
import { ScreenshotPlaceholder } from "~/components/screenshot-placeholder"
import { FeatureGrid } from "~/components/feature-grid"
import { AppScreenshots } from "~/components/app-screenshots"
import type { Screenshot } from "~/components/app-screenshots"
import { RunqProductPage } from "~/components/runq/runq-product-page"
import { DhenuProductPage } from "~/components/dhenu/dhenu-product-page"

// runQ renders through its own bespoke page (see ProductPage), so it no longer
// needs an entry here.
const PRODUCT_HERO_IMAGES: Record<string, string> = {}

const PRODUCT_SCREENSHOTS: Record<string, Screenshot[]> = {
  renewd: [
    {
      src: "/screenshots/renewd/home-dashboard.png",
      label: "Home",
      headline: "Everything at a Glance",
      description:
        "Your personal renewal command center. See overdue items, upcoming this week, and monthly spend — all in one scroll.",
      highlights: [
        "Due, active, and monthly spend summary cards",
        "Overdue renewals highlighted in red",
        "Quick-add new renewals with one tap",
      ],
    },
    {
      src: "/screenshots/renewd/categories.png",
      label: "Categories",
      headline: "Organized by What Matters",
      description:
        "Browse renewals by type — insurance, subscriptions, memberships. Search, filter, and see costs at a glance.",
      highlights: [
        "Filter by insurance, subscription, or membership",
        "Provider logos for instant recognition",
        "Color-coded urgency badges (overdue, due soon)",
      ],
    },
    {
      src: "/screenshots/renewd/renewal-detail.png",
      label: "Detail",
      headline: "Full Renewal Intelligence",
      description:
        "Every detail about a renewal in one place — amount, frequency, next date, auto-renew status, and AI-generated receipt summary.",
      highlights: [
        "Visual overdue countdown ring",
        "AI-extracted receipt summary from uploaded documents",
        "Provider, amount, frequency, and category info",
      ],
    },
    {
      src: "/screenshots/renewd/ai-chat.png",
      label: "AI Chat",
      headline: "Ask Anything About Your Renewals",
      description:
        "Chat with Renewd AI in natural language. Ask what's due this week, get spending breakdowns, or plan ahead.",
      highlights: [
        "Natural language queries — no menus to navigate",
        "Upcoming renewals sorted by urgency",
        "Spending insights and budget planning",
      ],
    },
    {
      src: "/screenshots/renewd/scan-document.png",
      label: "Scan",
      headline: "Scan It, Forget It",
      description:
        "Upload an invoice, policy, or receipt — AI reads it and creates the renewal entry automatically. Camera scan, photo library, or file browser.",
      highlights: [
        "Camera scan for physical documents",
        "Photo library and file browser support",
        "AI extracts provider, amount, dates, and category",
      ],
    },
    {
      src: "/screenshots/renewd/vault.png",
      label: "Vault",
      headline: "Your Documents, Encrypted",
      description:
        "AES-256 encrypted vault stores all your policies, invoices, and receipts. Search, filter, and access securely — linked to their renewals.",
      highlights: [
        "AES-256 encryption at rest",
        "AI-analyzed documents with status badges",
        "Search and filter by renewal or type",
      ],
    },
    {
      src: "/screenshots/renewd/notifications.png",
      label: "Notifications",
      headline: "Never Out of the Loop",
      description:
        "Timely notifications for support replies, renewal reminders, and document updates. Mark all read with one tap.",
    },
    {
      src: "/screenshots/renewd/support.png",
      label: "Support",
      headline: "Help When You Need It",
      description:
        "Built-in support with feedback, questions, and feature requests. Track status of each ticket in real time.",
      highlights: [
        "Categorized tickets — feedback, questions, features",
        "Real-time status tracking (open, in progress)",
        "Direct communication with the Renewd team",
      ],
    },
    {
      src: "/screenshots/renewd/support-chat.png",
      label: "Chat",
      headline: "Real Conversations, Not Chatbots",
      description:
        "Get responses from the actual Renewd support team. Ask about document safety, encryption, or anything else.",
    },
  ],
}

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug)
    if (!product) throw notFound()
    return { product }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? buildMeta({
          title: loaderData.product.name,
          description: loaderData.product.tagline,
        })
      : [],
  }),
  component: ProductPage,
})

function HeroImage({ src, name, color }: { src: string; name: string; color: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div
        className="overflow-hidden rounded-2xl border border-border shadow-2xl"
        style={{
          boxShadow: `0 25px 50px -12px ${color}30`,
        }}
      >
        <img
          src={src}
          alt={`${name} dashboard`}
          className="w-full"
        />
      </div>
    </div>
  )
}

function ProductPage() {
  const { product } = Route.useLoaderData()

  // runQ and Dhenu get bespoke pages; other products use the shared template.
  if (product.slug === "runq") {
    return <RunqProductPage product={product} />
  }
  if (product.slug === "dhenu") {
    return <DhenuProductPage product={product} />
  }

  const screenshots = PRODUCT_SCREENSHOTS[product.slug]
  const heroImage = PRODUCT_HERO_IMAGES[product.slug]

  return (
    <main>
      <ProductHero product={product} />
      {heroImage ? (
        <HeroImage src={heroImage} name={product.name} color={product.color} />
      ) : screenshots ? (
        <AppScreenshots screenshots={screenshots} color={product.color} />
      ) : (
        <ScreenshotPlaceholder
          productName={product.name}
          color={product.color}
        />
      )}
      {product.features.length > 0 && (
        <FeatureGrid features={product.features} color={product.color} />
      )}
    </main>
  )
}
