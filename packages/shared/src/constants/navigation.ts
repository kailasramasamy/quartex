export interface NavLink {
  label: string
  href: string
}

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const productNavLinks: NavLink[] = [
  { label: "runQ", href: "/products/runq" },
  { label: "Martly", href: "/products/martly" },
  { label: "Dhenu", href: "/products/dhenu" },
  { label: "Renewd", href: "/products/renewd" },
]

export const footerLinks = {
  products: productNavLinks,
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}
