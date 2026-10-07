import { PageHeader } from "~/components/page-header"
import { SectionWrapper } from "~/components/section-wrapper"
import { LegalSection } from "~/components/legal-section"
import type { LegalSectionData } from "~/components/legal-section"

interface LegalDocumentProps {
  title: string
  subtitle: string
  lastUpdated: string
  intro: string
  sections: LegalSectionData[]
}

function LegalDocument({ title, subtitle, lastUpdated, intro, sections }: LegalDocumentProps) {
  return (
    <main>
      <PageHeader title={title} subtitle={subtitle} />
      <SectionWrapper className="pt-0 lg:pt-0">
        <article className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-3">
            <p className="font-body text-sm text-text-muted">Last updated: {lastUpdated}</p>
            <p className="font-body text-base leading-relaxed text-text-secondary">{intro}</p>
          </div>
          {sections.map((section) => (
            <LegalSection key={section.heading} {...section} />
          ))}
        </article>
      </SectionWrapper>
    </main>
  )
}

export { LegalDocument }
