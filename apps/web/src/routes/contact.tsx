import { createFileRoute } from "@tanstack/react-router"
import { buildMeta } from "@quartex/shared"
import { PageHeader } from "~/components/page-header"
import { SectionWrapper } from "~/components/section-wrapper"
import { ContactForm } from "~/components/contact-form"
import { Mail, MapPin } from "lucide-react"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: buildMeta({
      title: "Contact",
      description: "Get in touch with Quartex Technologies.",
    }),
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Get in Touch"
        subtitle="Have a question or want to work together? Drop us a message."
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ContactInfo
              icon={Mail}
              title="Email"
              detail="hello@quartex.in"
            />
            <ContactInfo
              icon={MapPin}
              title="Location"
              detail="Vrindavan, Uttar Pradesh, India"
            />
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

function ContactInfo({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Mail
  title: string
  detail: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-accent/10 p-3 shrink-0">
        <Icon size={22} className="text-accent" />
      </div>
      <div>
        <h3 className="font-heading font-semibold mb-1">{title}</h3>
        <p className="text-text-secondary text-sm">{detail}</p>
      </div>
    </div>
  )
}
