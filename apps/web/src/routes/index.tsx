import { createFileRoute } from "@tanstack/react-router"
import { HeroSection } from "~/components/hero-section"
import { ProductShowcase } from "~/components/product-showcase"
import { VerticalsSection } from "~/components/verticals-section"
import { TechStackSection } from "~/components/tech-stack-section"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <VerticalsSection />
      <TechStackSection />
    </main>
  )
}
