export interface ProductFeature {
  icon: string
  title: string
  description: string
}

export interface ProductLinks {
  appStore?: string
  playStore?: string | "coming-soon"
  web?: string
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
  appIcon?: string
  links?: ProductLinks
}
