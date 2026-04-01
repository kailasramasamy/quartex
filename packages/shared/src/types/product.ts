export interface ProductFeature {
  icon: string
  title: string
  description: string
}

export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  features: ProductFeature[]
  color: string
  iconName: string
  status: "live" | "beta" | "coming-soon"
}
