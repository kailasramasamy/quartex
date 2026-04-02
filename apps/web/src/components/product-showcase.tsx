import { products } from "@quartex/shared"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { ProductCard } from "~/components/product-card"

function ProductShowcaseHeader() {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-heading text-4xl font-bold text-text-primary lg:text-5xl">
        Our <GradientText>Products</GradientText>
      </h2>
      <p className="mt-4 text-lg text-text-secondary">
        AI-powered software built for modern operations
      </p>
    </div>
  )
}

function ProductShowcase() {
  return (
    <SectionWrapper id="products">
      <ProductShowcaseHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export { ProductShowcase }
