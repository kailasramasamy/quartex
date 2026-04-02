import { Link } from "@tanstack/react-router"
import { footerLinks } from "@quartex/shared"

interface FooterLinkItem {
  label: string
  href: string
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string
  links: FooterLinkItem[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-heading font-semibold text-sm text-text-primary uppercase tracking-wider">
        {heading}
      </p>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col gap-3">
            <Link to="/">
              <img
                src="/quartex-logo.png"
                alt="Quartex"
                className="h-7"
              />
            </Link>
            <p className="font-body text-sm text-text-secondary max-w-xs">
              Building software that moves fast.
            </p>
          </div>

          <FooterColumn heading="Products" links={footerLinks.products} />
          <FooterColumn heading="Company" links={footerLinks.company} />
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="font-body text-sm text-text-muted text-center">
            © 2026 Quartex Technologies Pvt Ltd
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
