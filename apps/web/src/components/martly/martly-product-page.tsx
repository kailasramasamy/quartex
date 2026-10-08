import type { Product } from "@quartex/shared"
import { MartlyHero } from "./martly-hero"
import { MartlyHow } from "./martly-how"
import { MartlySpotlights } from "./martly-spotlights"
import { MartlyPlatform } from "./martly-platform"
import { MartlyGallery } from "./martly-gallery"
import { MartlyCta } from "./martly-cta"

/** Bespoke, screenshot-forward product page for the Martly grocery app and store platform. */
function MartlyProductPage({ product }: { product: Product }) {
  return (
    <main>
      <MartlyHero product={product} />
      <MartlyHow />
      <MartlySpotlights />
      <MartlyPlatform />
      <MartlyGallery />
      <MartlyCta />
    </main>
  )
}

export { MartlyProductPage }
