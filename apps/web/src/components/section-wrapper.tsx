interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export { SectionWrapper }
export type { SectionWrapperProps }
