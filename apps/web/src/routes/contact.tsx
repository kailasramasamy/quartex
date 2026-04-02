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
            <SpamProofEmail />
            <ContactInfo
              icon={MapPin}
              title="Location"
              lines={[
                "Quartex Technologies",
                "Sy No 26, Janthgondanahalli",
                "Varthur, Muthsandra Post",
                "Sarjapur Hobli, Bangalore 560087",
              ]}
            />
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

function SpamProofEmail() {
  const user = "hello"
  const domain = "quartex.in"
  const handleClick = () => {
    window.location.href = `mailto:${user}@${domain}`
  }

  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-accent/10 p-3 shrink-0">
        <Mail size={22} className="text-accent" />
      </div>
      <div>
        <h3 className="font-heading font-semibold mb-1">Email</h3>
        <button
          onClick={handleClick}
          className="text-text-secondary text-sm hover:text-accent transition-colors cursor-pointer"
        >
          {user}[at]{domain}
        </button>
      </div>
    </div>
  )
}

function ContactInfo({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof Mail
  title: string
  lines: string[]
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-accent/10 p-3 shrink-0">
        <Icon size={22} className="text-accent" />
      </div>
      <div>
        <h3 className="font-heading font-semibold mb-1">{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className={`text-text-secondary text-sm ${i === 0 ? "font-medium text-text-primary" : ""}`}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
