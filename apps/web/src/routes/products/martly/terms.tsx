import { createFileRoute } from "@tanstack/react-router"
import { buildMeta } from "@quartex/shared"
import { LegalDocument } from "~/components/legal-document"
import type { LegalSectionData } from "~/components/legal-section"

export const Route = createFileRoute("/products/martly/terms")({
  head: () => ({
    meta: buildMeta({
      title: "Martly Terms of Use",
      description: "The terms that apply when you use the Martly app to order groceries.",
    }),
  }),
  component: MartlyTermsPage,
})

const SECTIONS: LegalSectionData[] = [
  {
    heading: "About Martly",
    paragraphs: [
      "Martly is operated by Quartex Technologies, Bangalore, India. Martly lets you order groceries and daily essentials from partner stores near you for delivery or store pickup. By creating an account or placing an order, you agree to these terms and to our Privacy Policy.",
    ],
  },
  {
    heading: "Your account",
    bullets: [
      "You must be at least 18 years old and able to enter a binding contract to place orders.",
      "You sign in with your mobile number and a one-time password. Keep access to your phone secure; you are responsible for orders placed from your account.",
      "Provide accurate details, including your name, phone number and delivery address.",
    ],
  },
  {
    heading: "Products, prices and availability",
    bullets: [
      "Products are sold and fulfilled by the partner store you order from. Prices, offers and stock are set by each store and can change.",
      "Product images are for illustration; packaging and appearance may vary. Fresh produce is sold by approximate weight or count.",
      "If an item becomes unavailable after you order, the store may remove it and you will not be charged for it.",
      "We may correct obvious pricing errors and cancel affected orders, refunding any amount paid.",
    ],
  },
  {
    heading: "Orders, delivery and pickup",
    bullets: [
      "Delivery is available only within each store's delivery area. Delivery times shown in the app are estimates, not guarantees.",
      "Delivery fees, minimum order values and free-delivery thresholds are shown before you place your order.",
      "For store pickup, collect your order from the store within its opening hours.",
      "Please be available at the delivery address. If an order cannot be delivered after reasonable attempts, it may be cancelled.",
    ],
  },
  {
    heading: "Cancellations",
    paragraphs: [
      "You can cancel an order in the app while it is Pending or Confirmed. Once the store starts preparing it, it can no longer be cancelled. Amounts paid for cancelled orders are refunded to your Martly Wallet.",
    ],
  },
  {
    heading: "Returns and refunds",
    bullets: [
      "If an item is missing, damaged, expired or not as described, request a return from the order in the app or contact support as soon as possible after delivery.",
      "Approved refunds are credited to your Martly Wallet. To request a refund to your original payment method instead, contact support.",
      "For hygiene and safety reasons, opened personal-care items and perishable goods without a quality issue cannot be returned.",
    ],
  },
  {
    heading: "Payments",
    paragraphs: [
      "You can pay online through Razorpay (UPI, cards, net banking), with your Martly Wallet balance, or by cash on delivery where available. Online payments are subject to Razorpay's terms.",
    ],
  },
  {
    heading: "Mart Plus",
    bullets: [
      "Mart Plus is an optional paid membership offering benefits such as free delivery and member prices, as described in the app when you join.",
      "Membership runs for the period you purchase (monthly, quarterly or annual) and does not renew automatically.",
      "Membership fees are not refundable once the membership is active, except where required by law. Benefits may change; any change will not reduce benefits for a period you have already paid for.",
    ],
  },
  {
    heading: "Martly Wallet",
    paragraphs: [
      "Your Martly Wallet balance can be used for orders on Martly. It cannot be transferred, withdrawn as cash or exchanged for money, except where required by law.",
    ],
  },
  {
    heading: "Reviews and content you post",
    bullets: [
      "Reviews and photos you post must be honest, relate to products you bought, and must not be offensive, misleading or infringe anyone's rights.",
      "We may remove content that breaks these rules and suspend accounts that repeatedly do so.",
      "You allow us to display your reviews and photos within Martly.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "Do not misuse Martly: no fraudulent orders, abuse of offers or referral rewards, interference with the app's operation, or harassment of store or delivery staff. We may suspend or close accounts that do.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "Martly is provided on an \"as available\" basis. To the extent permitted by law, our liability for any order is limited to the amount you paid for that order. Nothing in these terms limits rights you have under the Consumer Protection Act, 2019 or other applicable law.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. Courts in Bangalore, Karnataka have jurisdiction, subject to your rights as a consumer.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "We may update these terms and will post the new version here with a new \"Last updated\" date. Questions or complaints: hello@quartex.in.",
    ],
  },
]

function MartlyTermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      subtitle="Martly by Quartex Technologies"
      lastUpdated="8 October 2026"
      intro="Please read these terms carefully. They explain how ordering through Martly works and the rules that apply to you and to us."
      sections={SECTIONS}
    />
  )
}
