import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Menu, ChevronDown } from "lucide-react"
import { mainNavLinks, productNavLinks } from "@quartex/shared"
import { MobileMenu } from "~/components/mobile-menu"

function ProductsDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="inline-flex items-center gap-1 font-body text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
      >
        Products
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-44 bg-bg-card border border-border rounded-xl shadow-xl z-40 py-1">
          {productNavLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block px-4 py-2.5 font-body text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-bg-primary/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-heading font-bold text-xl text-text-primary shrink-0"
          >
            Quartex
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ProductsDropdown />
          </nav>

          <div className="hidden lg:block w-28" />

          <button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

export { Navbar }
