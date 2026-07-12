import type { Product } from "@quartex/shared"
import { DhenuHero } from "./dhenu-hero"
import { DhenuChain } from "./dhenu-chain"
import { DhenuPersonas } from "./dhenu-personas"
import { DhenuSpotlights } from "./dhenu-spotlights"
import { DhenuFeatures } from "./dhenu-features"
import { DhenuGallery } from "./dhenu-gallery"
import { DhenuCta } from "./dhenu-cta"

/** Bespoke, screenshot-forward product page for the Dhenu milk-procurement app. */
function DhenuProductPage({ product }: { product: Product }) {
  return (
    <main>
      <DhenuHero product={product} />
      <DhenuChain />
      <DhenuPersonas />
      <DhenuSpotlights />
      <DhenuFeatures />
      <DhenuGallery />
      <DhenuCta />
    </main>
  )
}

export { DhenuProductPage }
