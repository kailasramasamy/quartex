import { createFileRoute } from "@tanstack/react-router"
import { buildMeta } from "@quartex/shared"
import { LegalDocument } from "~/components/legal-document"
import type { LegalSectionData } from "~/components/legal-section"

export const Route = createFileRoute("/products/martly/privacy")({
  head: () => ({
    meta: buildMeta({
      title: "Martly Privacy Policy",
      description: "How Martly collects, uses and protects your personal information.",
    }),
  }),
  component: MartlyPrivacyPage,
})

const SECTIONS: LegalSectionData[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Martly is a grocery ordering and delivery app operated by Quartex Technologies, Sy No 26, Janthgondanahalli, Varthur, Muthsandra Post, Sarjapur Hobli, Bangalore 560087, India (\"we\", \"us\"). This policy explains what personal information Martly collects, why, and the choices you have.",
    ],
  },
  {
    heading: "Information we collect",
    bullets: [
      "Account details: your name and mobile number, which you use to sign in with a one-time password.",
      "Delivery addresses: the addresses you save, including their map location, so orders reach the right place.",
      "Location: with your permission, your device location while you use the app, to show stores near you and check whether they deliver to you. We do not track your location in the background.",
      "Orders and activity: items you browse, add to your cart or wishlist, orders and returns, product reviews and photos you choose to post, and messages you send to customer support.",
      "Payments: online payments are processed by Razorpay. We never see or store your card, UPI or bank details — we only receive the payment status and a reference.",
      "Wallet and membership: your Martly Wallet balance and transactions, and your Mart Plus membership.",
      "Device information: a notification token so we can send order updates, plus basic technical information such as device type and app version.",
      "Voice input: if you use voice search, your speech is converted to text by Apple's speech recognition. We receive only the resulting text, not the audio.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "To process, deliver and support your orders, including store pickup.",
      "To show stores, prices and delivery options available at your location.",
      "To process payments, refunds, wallet transactions and memberships.",
      "To send order updates and, where you allow it, offers and reminders.",
      "To personalise your experience, such as \"Buy again\" suggestions.",
      "To answer your support requests.",
      "To prevent fraud and misuse, and to meet our legal obligations.",
    ],
  },
  {
    heading: "Who we share it with",
    paragraphs: [
      "We do not sell your personal information. We share it only as needed to run Martly:",
    ],
    bullets: [
      "The store fulfilling your order and the person delivering it receive your name, phone number, delivery address and order details.",
      "Service providers that operate parts of Martly on our behalf: Railway (hosting), Amazon Web Services (image and file storage), Google Firebase (notifications), Google Maps Platform (address lookup), Razorpay (payments) and Anthropic (the AI ordering assistant, support assistant and smart search, which process the messages and search text you enter).",
      "Authorities, when required by law or to protect the rights and safety of our users and business.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep your information while your account is active. When you delete your account, we immediately delete or anonymise your personal information, except records we must keep longer under tax, accounting or other legal requirements, such as invoices for completed orders.",
    ],
  },
  {
    heading: "Your choices and rights",
    bullets: [
      "View and update your name, phone number and addresses in the Account section of the app.",
      "Turn location, notification and microphone access on or off at any time in your device settings. Martly still works without location; you can choose a store manually.",
      "Delete your account at any time in the app under Account → Delete account. If you can't access the app, email hello@quartex.in with your registered mobile number.",
      "Under India's Digital Personal Data Protection Act, 2023, you may request access to, correction or erasure of your personal data, and nominate another person to exercise these rights on your behalf.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "Martly is intended for adults who can place orders and make payments. We do not knowingly collect personal information from children under 18. If you believe a child has given us their information, contact us and we will delete it.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "All data is sent over encrypted connections (HTTPS), access to personal information is restricted to people who need it to run Martly, and payment details are handled only by our payment provider.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy as Martly changes. We will post the new version on this page with a new \"Last updated\" date, and tell you in the app about significant changes.",
    ],
  },
  {
    heading: "Contact and grievances",
    paragraphs: [
      "For questions, requests or complaints about your personal data, contact our Grievance Officer at hello@quartex.in or write to the address above. We aim to respond within 30 days.",
    ],
  },
]

function MartlyPrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="Martly by Quartex Technologies"
      lastUpdated="8 October 2026"
      intro="Your privacy matters to us. This policy describes the personal information the Martly app collects, how we use and share it, and the choices you have."
      sections={SECTIONS}
    />
  )
}
