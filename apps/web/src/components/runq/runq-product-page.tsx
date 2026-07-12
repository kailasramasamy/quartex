import type { Product } from "@quartex/shared"
import { RunqHero } from "./runq-hero"
import { RunqPositioning } from "./runq-positioning"
import { RunqModules } from "./runq-modules"
import { RunqSpotlights } from "./runq-spotlights"
import { RunqBeyondSection } from "./runq-beyond"
import { RunqPlatform } from "./runq-platform"
import { RunqCta } from "./runq-cta"

/** Bespoke, module-forward product page for runQ (replaces the shared template). */
function RunqProductPage({ product }: { product: Product }) {
  return (
    <main>
      <RunqHero product={product} />
      <RunqPositioning />
      <RunqModules />
      <RunqSpotlights />
      <RunqBeyondSection />
      <RunqPlatform />
      <RunqCta product={product} />
    </main>
  )
}

export { RunqProductPage }
