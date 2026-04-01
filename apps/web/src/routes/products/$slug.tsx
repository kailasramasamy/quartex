import { createFileRoute, notFound } from "@tanstack/react-router"
import { products, buildMeta } from "@quartex/shared"
import { ProductHero } from "~/components/product-hero"
import { ScreenshotPlaceholder } from "~/components/screenshot-placeholder"
import { FeatureGrid } from "~/components/feature-grid"

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug)
    if (!product) throw notFound()
    return { product }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? buildMeta({
          title: loaderData.product.name,
          description: loaderData.product.tagline,
        })
      : [],
  }),
  component: ProductPage,
})

function ProductPage() {
  const { product } = Route.useLoaderData()

  return (
    <main>
      <ProductHero product={product} />
      <ScreenshotPlaceholder productName={product.name} color={product.color} />
      <FeatureGrid features={product.features} color={product.color} />
    </main>
  )
}
