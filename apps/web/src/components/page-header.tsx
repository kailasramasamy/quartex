import { GradientText } from "~/components/gradient-text"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-bg-primary">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight">
          <GradientText>{title}</GradientText>
        </h1>
        {subtitle && (
          <p className="mt-5 font-body text-lg text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

export { PageHeader }
export type { PageHeaderProps }
