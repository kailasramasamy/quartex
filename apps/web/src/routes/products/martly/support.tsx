import { createFileRoute, Link } from "@tanstack/react-router"
import { buildMeta } from "@quartex/shared"
import { Mail, MessageCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { SectionWrapper } from "~/components/section-wrapper"
import { LegalSection } from "~/components/legal-section"
import type { LegalSectionData } from "~/components/legal-section"

export const Route = createFileRoute("/products/martly/support")({
  head: () => ({
    meta: buildMeta({
      title: "Martly Support",
      description: "Get help with your Martly orders, payments, Mart Plus and account.",
    }),
  }),
  component: MartlySupportPage,
})

const SUPPORT_EMAIL = "hello@quartex.in"

const FAQ: LegalSectionData[] = [
  {
    heading: "Where is Martly available?",
    paragraphs: [
      "Martly works with partner stores in a growing number of cities across India. Open the app and allow location access to see stores near you and whether they deliver to your address. You can also choose a store manually.",
    ],
  },
  {
    heading: "How do I track my order?",
    paragraphs: ["Go to Orders in the app and open your order to see its live status, from confirmation to delivery."],
  },
  {
    heading: "Can I cancel my order?",
    paragraphs: [
      "Yes, while it is Pending or Confirmed: open the order and tap Cancel Order. Once the store starts preparing it, it can no longer be cancelled. Any amount paid is refunded to your Martly Wallet.",
    ],
  },
  {
    heading: "An item is missing, damaged or not what I ordered",
    paragraphs: [
      "Open the order in the app and request a return, or contact us using one of the options above. Approved refunds are credited to your Martly Wallet.",
    ],
  },
  {
    heading: "Which payment methods can I use?",
    paragraphs: ["UPI, cards and net banking through Razorpay, your Martly Wallet balance, or cash on delivery where available."],
  },
  {
    heading: "What is Mart Plus?",
    paragraphs: [
      "Mart Plus is an optional membership with benefits such as free delivery and member prices. Choose a monthly, quarterly or annual plan under Account → Mart Plus. It does not renew automatically.",
    ],
  },
  {
    heading: "How do I change my delivery address?",
    paragraphs: ["Go to Account → Saved addresses to add, edit or remove addresses, or pick a different address at checkout."],
  },
  {
    heading: "How do I delete my account?",
    paragraphs: [
      `Email ${SUPPORT_EMAIL} with your registered mobile number and we will delete your account and personal data within 30 days, except records we are legally required to keep.`,
    ],
  },
]

function ContactCard({ icon: Icon, title, body, action }: {
  icon: LucideIcon
  title: string
  body: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-card p-6 flex items-start gap-4">
      <div className="rounded-lg bg-accent/10 p-3 shrink-0">
        <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h2 className="font-heading font-semibold text-lg text-text-primary">{title}</h2>
        <p className="font-body text-sm leading-relaxed text-text-secondary">{body}</p>
        {action && (
          <a href={action.href} className="inline-block pt-1 font-body text-sm font-medium text-accent hover:text-accent-hover">
            {action.label}
          </a>
        )}
      </div>
    </div>
  )
}

function MartlySupportPage() {
  return (
    <main>
      <PageHeader title="Martly Support" subtitle="Help with your orders, payments, Mart Plus and account." />
      <SectionWrapper className="pt-0 lg:pt-0">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard
              icon={MessageCircle}
              title="Chat in the app"
              body="Fastest for order issues: Account → Chat with Support, or open your order and tap Get Help."
            />
            <ContactCard
              icon={Mail}
              title="Email us"
              body="We usually reply within one business day."
              action={{ href: `mailto:${SUPPORT_EMAIL}?subject=Martly%20support`, label: SUPPORT_EMAIL }}
            />
          </div>
          <div className="space-y-10">
            <h2 className="font-heading font-bold text-3xl text-text-primary">Frequently asked questions</h2>
            {FAQ.map((item) => (
              <LegalSection key={item.heading} {...item} />
            ))}
          </div>
          <p className="font-body text-sm text-text-muted">
            See also our{" "}
            <Link to="/products/martly/privacy" className="text-accent hover:text-accent-hover">Privacy Policy</Link>
            {" "}and{" "}
            <Link to="/products/martly/terms" className="text-accent hover:text-accent-hover">Terms of Use</Link>.
          </p>
        </div>
      </SectionWrapper>
    </main>
  )
}
