interface LegalSectionData {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

function LegalSection({ heading, paragraphs = [], bullets = [] }: LegalSectionData) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading font-semibold text-2xl text-text-primary">{heading}</h2>
      {paragraphs.map((text) => (
        <p key={text} className="font-body text-base leading-relaxed text-text-secondary">
          {text}
        </p>
      ))}
      {bullets.length > 0 && (
        <ul className="list-disc pl-6 space-y-2 font-body text-base leading-relaxed text-text-secondary">
          {bullets.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export { LegalSection }
export type { LegalSectionData }
