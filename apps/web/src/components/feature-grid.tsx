import type { ProductFeature } from "@quartex/shared"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { FeatureCard } from "~/components/feature-card"

interface FeatureGridProps {
  features: ProductFeature[]
  color: string
}

function FeatureGrid({ features, color }: FeatureGridProps) {
  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
          <GradientText>Key Features</GradientText>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} color={color} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export { FeatureGrid }
export type { FeatureGridProps }
