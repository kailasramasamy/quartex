import { createFileRoute } from "@tanstack/react-router"
import { HeroSection } from "~/components/hero-section"
import { StatsBar } from "~/components/stats-bar"
import { ProductShowcase } from "~/components/product-showcase"
import { VerticalsSection } from "~/components/verticals-section"
import { TechStackSection } from "~/components/tech-stack-section"
import { CTASection } from "~/components/cta-section"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <ProductShowcase />
      <VerticalsSection />
      <TechStackSection />
      <CTASection />
    </main>
  )
}
